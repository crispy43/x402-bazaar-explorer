import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';

import { Theme } from '~/common/constants';
import { Button } from '~/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { useLanguage } from '~/hooks/use-language';
import { useTheme } from '~/hooks/use-theme';
import { cn } from '~/lib/utils';

import type { loader } from '../../default';

export default function Header() {
  const { t } = useLoaderData<typeof loader>();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 56;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  const toggleTheme = () => {
    setTheme(theme === Theme.light ? Theme.dark : Theme.light);
  };

  return (
    <motion.header
      className={cn(
        'fixed z-10 flex h-12 w-full items-center justify-center bg-background t:h-14',
        scrolled && 'shadow-sm dark:border-b dark:shadow-none',
      )}
      initial={{ paddingTop: '12px' }}
      animate={
        !scrolled
          ? { paddingTop: '12px' }
          : {
              paddingTop: '0',
            }
      }
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div className="container flex h-full max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex gap-2 py-1 text-xl">
          <span className="font-extrabold tracking-wide">x402</span>
          <span className="font-medium tracking-tight text-foreground/70">
            Bazaar Explorer
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              render={(props) => (
                <Button
                  {...props}
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="font-medium tracking-tight"
                >
                  {language === 'ko' ? 'KOR' : 'ENG'}
                </Button>
              )}
            />
            <TooltipContent>{t.word.toggleLanguage}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={(props) => (
                <Button {...props} variant="ghost" onClick={toggleTheme}>
                  {theme === 'light' ? <Sun /> : <Moon />}
                </Button>
              )}
            />
            <TooltipContent>{t.word.toggleTheme}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </motion.header>
  );
}
