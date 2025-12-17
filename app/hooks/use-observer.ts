import { useEffect, useRef } from 'react';

interface UseObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

interface UseObserverReturn {
  observerTarget: React.RefObject<any>;
  isSupported: boolean;
}

const useObserver = <T = any>(
  items: T[],
  callback: () => void,
  options: UseObserverOptions = {
    threshold: 1,
    rootMargin: '0px',
    root: null,
  },
): UseObserverReturn => {
  const observerTarget = useRef(null);
  const callbackRef = useRef(callback);
  const isSupported = typeof IntersectionObserver !== 'undefined';

  // callback을 최신 상태로 유지 (stale closure 방지)
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isSupported || !observerTarget.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          callbackRef.current();
        }
      },
      { ...options },
    );

    const currentTarget = observerTarget.current;
    observer.observe(currentTarget);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, isSupported]);

  return { observerTarget, isSupported };
};

export default useObserver;
