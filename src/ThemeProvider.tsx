import { createContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContext<{
  theme: Theme;
  isDark: boolean;
  isLight: boolean;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'light',
  isDark: false,
  isLight: true,
  setTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    const cachedTheme = localStorage.getItem('theme');
    if (cachedTheme) {
      return cachedTheme as Theme;
    }

    return 'light';
  });

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
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
        setTheme: (theme: Theme) => {
          setTheme(theme);
          localStorage.setItem('theme', theme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
