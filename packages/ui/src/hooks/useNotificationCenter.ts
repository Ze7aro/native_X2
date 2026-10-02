import { useCallback, useRef, useState } from 'react';
import type { NotificationInput, NotificationItem } from '../components/Toast';

export function useNotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const idRef = useRef(0);

  const notify = useCallback((notification: NotificationInput): string => {
    const id = notification.id ?? `notification-${Date.now()}-${idRef.current++}`;
    setNotifications((current) => [...current, { ...notification, id }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  }, []);

  const clear = useCallback(() => setNotifications([]), []);

  return { notifications, notify, dismiss, clear };
}
