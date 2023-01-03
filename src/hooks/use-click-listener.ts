import { useEffect, useRef } from 'react';

type EventType = 'click' | 'touch';

type Callback = (event: Event) => void;

type Options = {
  eventType?: EventType;
  onClickInside: Callback;
  onClickOutside: Callback;
};

export const useClickListener = ({
  eventType = 'click',
  onClickInside,
  onClickOutside,
}: Options) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onClickHandler = (event: Event) => {
      const { current: element } = elementRef;
      if (element && element.contains(event.target as Node)) onClickInside(event);
      else onClickOutside(event);
    };

    document.addEventListener(eventType, onClickHandler);

    return () => {
      document.removeEventListener(eventType, onClickHandler);
    };
  }, [eventType, onClickInside, onClickOutside]);

  return elementRef;
};
