import useTheme from '@/hooks/useTheme';
import useWindowSize from '@/hooks/useWindowSize';
import getHeroImage from '@/utils/getHeroImage';

function HeroImage() {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { isDark } = useTheme();
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
