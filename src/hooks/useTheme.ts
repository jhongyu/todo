import { ThemeContext } from '@/ThemeProvider';
import { useContext, useEffect } from 'react';

const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleColorSchemeChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleColorSchemeChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleColorSchemeChange);
    };
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return {
    theme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    setTheme,
  };
};

export default useTheme;
