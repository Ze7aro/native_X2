import React from 'react';
import fs from 'fs';
import path from 'path';
import { render } from '@testing-library/react-native';
import { Modal, SearchField, ThemeProvider, X2StringsProvider, esStrings } from 'react-x2-native';

describe('X2StringsProvider', () => {
  it('defaults to English', () => {
    const { getByLabelText } = render(
      <ThemeProvider><SearchField defaultValue="x" /></ThemeProvider>,
    );
    expect(getByLabelText('Clear search')).toBeTruthy();
  });

  it('translates defaults and keeps per-prop overrides', () => {
    const { getByLabelText, getAllByLabelText, getByPlaceholderText } = render(
      <ThemeProvider>
        <X2StringsProvider strings={esStrings}>
          <SearchField defaultValue="x" />
          <SearchField defaultValue="y" clearLabel="Limpiar" placeholder="Filtrar" />
          <Modal isOpen onClose={() => undefined}><React.Fragment /></Modal>
        </X2StringsProvider>
      </ThemeProvider>,
    );
    expect(getByLabelText('Borrar búsqueda')).toBeTruthy();
    expect(getByLabelText('Limpiar')).toBeTruthy();
    expect(getByPlaceholderText('Filtrar')).toBeTruthy();
    expect(getAllByLabelText('Cerrar diálogo', { hidden: true }).length).toBe(2);
  });
});

describe('theming guard', () => {
  // Demo data: ColorShowcase displays the palette and Carousel uses decorative slide colors.
  const allowed = new Set(['screens/ColorShowcase.tsx', 'screens/CarouselShowcase.tsx']);

  it.each([
    ['components', '../packages/ui/src/components'],
    ['showcase', '../apps/showcase/src'],
  ])('has no hard-coded hex colors in %s', (_name, relative) => {
    const root = path.resolve(__dirname, relative);
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.tsx?$/.test(entry.name) && /#[0-9a-fA-F]{3,8}\b/.test(fs.readFileSync(full, 'utf8'))) {
          const rel = path.relative(root, full).split(path.sep).join('/');
          if (!allowed.has(rel)) offenders.push(rel);
        }
      }
    };
    walk(root);
    expect(offenders).toEqual([]);
  });
});
