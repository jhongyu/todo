import heroDarkImg from '@/assets/hero-dark.png';
import heroMobileDarkImg from '@/assets/hero-mobile-dark.png';
import heroMobileImg from '@/assets/hero-mobile.png';
import heroImg from '@/assets/hero.png';

export default function getHeroImage(isMobile: boolean, isDark: boolean) {
  if (isMobile && isDark) {
    return heroMobileDarkImg;
  } else if (isMobile && !isDark) {
    return heroMobileImg;
  } else if (!isMobile && isDark) {
    return heroDarkImg;
  } else {
    return heroImg;
  }
}
