import { ThemeContext } from '@/ThemeProvider';
import useWindowSize from '@/hooks/useWindowSize';
import getHeroImage from '@/utils/getHeroImage';
import { useContext } from 'react';

function HeroImage() {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { isDark } = useContext(ThemeContext);
  const imgSrc = getHeroImage(isMobile, isDark);

  return (
    <section className='hero'>
      <img
        className='h-full w-full object-fill'
        src={imgSrc}
        alt='hero picture'
      />
    </section>
  );
}

export default HeroImage;
