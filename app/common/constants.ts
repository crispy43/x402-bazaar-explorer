// * locale
export const LANGUAGES = ['en-US', 'ko-KR'] as const;
export const DEFAULT_LANGUAGE = 'en-US'; // 기본 언어
export enum Language {
  en = 'en',
  ko = 'ko',
}

// * theme
export enum Theme {
  dark = 'dark',
  light = 'light',
}

// * CDP Base URL
export const CDP_BASE_URL = 'https://api.cdp.coinbase.com';
