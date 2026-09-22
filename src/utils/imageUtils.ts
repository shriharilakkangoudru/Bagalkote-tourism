import { VERIFIED_IMAGES } from '../data/verifiedImages';

export const DEFAULT_FALLBACK_IMAGE = VERIFIED_IMAGES.defaultFallback;

/**
 * Handle broken or blocked image URLs cleanly in React img tags
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  customFallback?: string
) => {
  const target = e.currentTarget;
  if (!target.dataset.fallbackTried) {
    target.dataset.fallbackTried = 'true';
    target.src = customFallback || DEFAULT_FALLBACK_IMAGE;
  }
};

/**
 * Create a direct URL to verify the monument or image on Google Lens
 */
export const getGoogleLensVerifyUrl = (monumentName: string, imageUrl?: string): string => {
  if (imageUrl && !imageUrl.startsWith('data:')) {
    return `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageUrl)}`;
  }
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    `${monumentName} Bagalkote Karnataka heritage monument`
  )}`;
};

/**
 * Create a direct URL to search or verify on Wikimedia Commons
 */
export const getWikimediaSearchUrl = (monumentName: string): string => {
  return `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(
    `${monumentName} Karnataka`
  )}&title=Special:MediaSearch&go=Go&type=image`;
};

/**
 * Create a direct URL to search on Google Images with high-res filters
 */
export const getGoogleImagesUrl = (monumentName: string): string => {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    `"${monumentName}" Badami Pattadakal Aihole Karnataka`
  )}`;
};
