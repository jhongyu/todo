import { ThemeContext } from '@/ThemeProvider';
import { useContext } from 'react';
import { FiMoon as MoonIcon, FiSun as SunIcon } from 'react-icons/fi';

const Theme = () => {
  const { isDark, setTheme } = useContext(ThemeContext);

  return (
    <>
      {isDark ? (
        <button type='button' onClick={() => setTheme('light')}>
          <SunIcon size={26} />
        </button>
      ) : (
        <button type='button' onClick={() => setTheme('dark')}>
          <MoonIcon size={26} />
        </button>
      )}
    </>
  );
};

export default Theme;
