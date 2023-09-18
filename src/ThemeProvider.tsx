import { createContext, useState } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'light',
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

  return (
    <ThemeContext.Provider
      value={{
        theme,
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
