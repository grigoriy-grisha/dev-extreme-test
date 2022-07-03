import { useCallback, useLayoutEffect, useMemo, useRef } from "react";

function useEvent<Handler extends (...args: any) => any>(handler: Handler) {
  const handlerRef = useRef<Handler>(null!);

  useMemo(() => {
    handlerRef.current = handler;
  }, [{}]);

  return useCallback((...args: Parameters<Handler>) => handlerRef.current(...args), []);
}

export default useEvent;
