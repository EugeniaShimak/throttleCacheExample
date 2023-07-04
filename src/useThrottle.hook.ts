import { useCallback, useEffect, useRef } from "react";

export default function useThrottle(
  fn: (...args: any) => any,
  interval = 500
): (...args: any) => any {
  let timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      timer.current = undefined;
    };
  });

  return useCallback(
    (...args) => {
      if (timer.current) return;

      timer.current = setTimeout(() => {
        fn(...args);
        clearTimeout(timer.current);
        timer.current = undefined;
      }, interval);
    },
    [fn, interval]
  );
}
