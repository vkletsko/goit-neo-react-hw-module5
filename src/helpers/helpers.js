import { clsx } from 'clsx';
export const getImageUrl = imgUrl =>
  imgUrl
    ? `https://image.tmdb.org/t/p/w500${imgUrl}`
    : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1247449%2Fscreenshots%2F3984840%2Fno_img.png&f=1&nofb=1&ipt=4abacf63aad4b09a23a4320142437ab28f9ea7173cbfed5539b3ea2ce8595a54&ipo=images';

export const activeLinkClass = (linkProp, css) =>
  clsx(css.detailsNavLink, linkProp.isActive && css.active);
