import type { getImagesInDirectoryType } from './getImagesInDirectory';

interface getRandomImageArgs {
  getImagesInDirectory: getImagesInDirectoryType;
}
export const getRandomImage = async ({
  getImagesInDirectory,
}: getRandomImageArgs) => {
  const images = getImagesInDirectory('./public/images/backlog');
  return images[Math.floor(Math.random() * images.length)];
};
