import { RefObject, useEffect, useRef } from 'react';

type EventType = 'click' | 'touch' | 'mouseover';

type Callback = (event: Event) => void;

type Options = {
  eventType?: EventType;
  insideElement: Callback;
  outsideElement: Callback;
};

/**
 * A custom hook for adding an event listener to an element.
 * @param {Options} options - An object containing options for the event listener.
 * @property {eventType: EventType} [options.eventType='click'] - The type of event to listen for.
 * @property {(event: Event) => void} options.insideElement - A callback function to be called when the event occurs inside the element.
 * @property {(event: Event) => void} options.outsideElement - A callback function to be called when the event occurs outside the element.
 * @return {RefObject<HTMLElement>} A ref object that can be attached to an element to be listened to.
 * @example
 * const [toggle, setToggle] = useState(false);
 * const ref = useEventListener({
 *  insideElement: () => setToggle(true),
 *  outsideElement: () => setToggle(false)
 * });
 */
export const useEventListener = (options: Options): RefObject<HTMLElement> => {
  const ref = useRef<HTMLElement | null>(null);
  const { eventType = 'click', insideElement, outsideElement } = options;

  useEffect(() => {
    const eventHandler = (event: Event) => {
      const { current: element } = ref;
      if (element && element.contains(event.target as Node)) {
        insideElement(event);
      } else {
        outsideElement(event);
      }
    };

    document.addEventListener(eventType, eventHandler);

    return () => {
      document.removeEventListener(eventType, eventHandler);
    };
  }, [eventType, insideElement, outsideElement]);

  return ref;
};
