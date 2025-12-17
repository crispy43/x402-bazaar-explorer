import { useCallback, useEffect, useState } from 'react';
import translate from 'translate';

export const useTranslate = (text: string, lang?: string) => {
  const [data, setData] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  const handleTranslate = useCallback(
    async (text: string, lang: string) => {
      setData(text);
      if (lang) {
        setIsLoading(true);
        setData(await translate(text, lang));
        setIsLoading(false);
      }
    },
    [setData],
  );
  useEffect(() => {
    if (!text) setData('');
    handleTranslate(text, lang);
  }, [text, lang, handleTranslate]);
  return [data, isLoading] as const;
};
