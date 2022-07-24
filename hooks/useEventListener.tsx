import { useEffect, useMemo, useRef } from "react";

function useEventListener(eventName: string, handler: EventListener, element?: HTMLElement) {
  // Create a ref that stores handler
  const savedHandler = useRef<EventListener>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const finalElem = element || window;
      const isSupported = finalElem && finalElem.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event: Event) => {
        if(savedHandler.current) {
          savedHandler.current(event)
        }
      }
      // Add event listener
      finalElem.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        finalElem.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

export default useEventListener