import { useEffect, useState } from 'react';

export enum MediaQuery {
  MOBILE = '(max-width: 799px)',
  TABLET = '(min-width: 800px) and (max-width: 1279px)',
  DESKTOP = '(min-width: 1280px)',
  MOBILE_OR_TABLET = '(max-width: 1279px)',
  TABLET_OR_DESKTOP = '(min-width: 800px)',
}

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export const useMobileQuery = () => {
  return useMediaQuery(MediaQuery.MOBILE);
};

export const useTabletQuery = () => {
  return useMediaQuery(MediaQuery.TABLET);
};

export const useDesktopQuery = () => {
  return useMediaQuery(MediaQuery.DESKTOP);
};

export const useMobileOrTabletQuery = () => {
  return useMediaQuery(MediaQuery.MOBILE_OR_TABLET);
};

export const useTabletOrDesktopQuery = () => {
  return useMediaQuery(MediaQuery.TABLET_OR_DESKTOP);
};
