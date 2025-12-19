import { useCallback, useState } from 'react';

export default function useClipboard(timeout: number = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        // 일정 시간 후 상태 초기화
        setTimeout(() => setIsCopied(false), timeout);
      } catch (error) {
        console.error('Failed to copy text:', error);
        setIsCopied(false);
      }
    },
    [timeout],
  );

  return { isCopied, copy };
}
