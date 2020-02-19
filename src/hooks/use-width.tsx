import { useRef, useState, useLayoutEffect, RefObject } from 'react';
import { getNodeWidth } from '../helpers';

type UseDimensionsHook = [RefObject<HTMLDivElement>, number | undefined];

const useWidth = (): UseDimensionsHook => {
  const [width, setWidth] = useState<number>();

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const measure = () =>
        window.requestAnimationFrame(() => setWidth(getNodeWidth(ref.current as HTMLDivElement)));
      measure();

      window.addEventListener('resize', measure);

      return () => {
        window.removeEventListener('resize', measure);
      };
    }
  }, []);

  return [ref, width];
};

export default useWidth;
