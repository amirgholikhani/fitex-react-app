import { useState, useEffect } from 'react';

export function useAutoHide(duration = 3000) {
  const [visible, setVisible] = useState(false);

  // Call this to show the message
  function show() {
    setVisible(true);
  }

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration]);

  return { visible, show };
}
