/** Every user-facing fixed text in the library. Override per call site with the component's own prop. */
export interface X2Strings {
  // Overlays
  closeModal: string;
  closeSheet: string;
  closeMenu: string;
  closePopover: string;
  dismissTooltip: string;
  dismissNotification: string;
  openMenu: string;
  // Search & filtering
  search: string;
  clearSearch: string;
  searchTable: string;
  searchAndFilter: string;
  commandMenuTitle: string;
  commandSearchPlaceholder: string;
  commandEmpty: string;
  closeCommandMenu: string;
  // Data
  noDataAvailable: string;
  chartEmpty: string;
  chart: string;
  somethingWentWrong: string;
  retry: string;
  nothingHere: string;
  selectAllRows: string;
  selectRow: (row: number) => string;
  sortBy: (column: string) => string;
  // Navigation
  previousPage: string;
  nextPage: string;
  pageOf: (page: number, total: number) => string;
  stepLabel: (step: number, label: string) => string;
  // Forms
  fieldRequired: string;
  // Cards
  expandableCard: string;
  expandableCardHint: string;
  interactiveCard: string;
  interactiveCardHint: string;
  interactiveTiltedCard: string;
  addToCart: string;
  unavailable: string;
  outOfStock: string;
  reviewBy: (author: string) => string;
  imageN: (index: number) => string;
  viewAllImages: (count: number) => string;
  more: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  registerNow: string;
  // Dialogs
  confirm: string;
  cancel: string;
  back: string;
  next: string;
  finish: string;
  typeToConfirm: (text: string) => string;
  stepOf: (step: number, total: number) => string;
}

export const enStrings: X2Strings = {
  closeModal: 'Close modal',
  closeSheet: 'Close sheet',
  closeMenu: 'Close menu',
  closePopover: 'Close popover',
  dismissTooltip: 'Dismiss tooltip',
  dismissNotification: 'Dismiss notification',
  openMenu: 'Open menu',
  search: 'Search',
  clearSearch: 'Clear search',
  searchTable: 'Search table',
  searchAndFilter: 'Search and filter',
  commandMenuTitle: 'Command menu',
  commandSearchPlaceholder: 'Search commands',
  commandEmpty: 'No commands found',
  closeCommandMenu: 'Close command menu',
  noDataAvailable: 'No data available',
  chartEmpty: 'No chart data available',
  chart: 'Data chart',
  somethingWentWrong: 'Something went wrong',
  retry: 'Retry',
  nothingHere: 'Nothing here yet',
  selectAllRows: 'Select all rows',
  selectRow: (row) => `Select row ${row}`,
  sortBy: (column) => `Sort by ${column}`,
  previousPage: 'Previous page',
  nextPage: 'Next page',
  pageOf: (page, total) => `Page ${page} of ${total}`,
  stepLabel: (step, label) => `Step ${step}: ${label}`,
  fieldRequired: 'This field is required',
  expandableCard: 'Expandable card',
  expandableCardHint: 'Double tap to toggle expansion',
  interactiveCard: 'Interactive card',
  interactiveCardHint: 'Double tap to activate',
  interactiveTiltedCard: 'Interactive tilted card',
  addToCart: 'Add to Cart',
  unavailable: 'Unavailable',
  outOfStock: 'Out of Stock',
  reviewBy: (author) => `Review by ${author}`,
  imageN: (index) => `Image ${index}`,
  viewAllImages: (count) => `View all ${count} images`,
  more: 'More',
  eventDate: 'Date',
  eventTime: 'Time',
  eventLocation: 'Location',
  registerNow: 'Register Now',
  confirm: 'Confirm',
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
  finish: 'Finish',
  typeToConfirm: (text) => `Type "${text}" to confirm`,
  stepOf: (step, total) => `Step ${step} of ${total}`,
};

export const esStrings: X2Strings = {
  closeModal: 'Cerrar diálogo',
  closeSheet: 'Cerrar hoja',
  closeMenu: 'Cerrar menú',
  closePopover: 'Cerrar',
  dismissTooltip: 'Ocultar ayuda',
  dismissNotification: 'Descartar notificación',
  openMenu: 'Abrir menú',
  search: 'Buscar',
  clearSearch: 'Borrar búsqueda',
  searchTable: 'Buscar en la tabla',
  searchAndFilter: 'Buscar y filtrar',
  commandMenuTitle: 'Menú de comandos',
  commandSearchPlaceholder: 'Buscar comandos',
  commandEmpty: 'No se encontraron comandos',
  closeCommandMenu: 'Cerrar menú de comandos',
  noDataAvailable: 'Sin datos disponibles',
  chartEmpty: 'Sin datos para el gráfico',
  chart: 'Gráfico de datos',
  somethingWentWrong: 'Algo salió mal',
  retry: 'Reintentar',
  nothingHere: 'Aún no hay nada aquí',
  selectAllRows: 'Seleccionar todas las filas',
  selectRow: (row) => `Seleccionar fila ${row}`,
  sortBy: (column) => `Ordenar por ${column}`,
  previousPage: 'Página anterior',
  nextPage: 'Página siguiente',
  pageOf: (page, total) => `Página ${page} de ${total}`,
  stepLabel: (step, label) => `Paso ${step}: ${label}`,
  fieldRequired: 'Este campo es obligatorio',
  expandableCard: 'Tarjeta expandible',
  expandableCardHint: 'Toca dos veces para expandir o contraer',
  interactiveCard: 'Tarjeta interactiva',
  interactiveCardHint: 'Toca dos veces para activar',
  interactiveTiltedCard: 'Tarjeta inclinable interactiva',
  addToCart: 'Añadir al carrito',
  unavailable: 'No disponible',
  outOfStock: 'Agotado',
  reviewBy: (author) => `Reseña de ${author}`,
  imageN: (index) => `Imagen ${index}`,
  viewAllImages: (count) => `Ver las ${count} imágenes`,
  more: 'Más',
  eventDate: 'Fecha',
  eventTime: 'Hora',
  eventLocation: 'Lugar',
  registerNow: 'Regístrate',
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  back: 'Atrás',
  next: 'Siguiente',
  finish: 'Finalizar',
  typeToConfirm: (text) => `Escribe "${text}" para confirmar`,
  stepOf: (step, total) => `Paso ${step} de ${total}`,
};
