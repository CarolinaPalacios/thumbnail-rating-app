import { thumbnailMover } from '../src/thumbnailMover';

describe('thumbailMover', () => {
  it('if given a imageId and an argument of good, move the image to a good directory', async () => {
    const isGood = true;
    const imageId = 'my-image.jpg';
    const fileMover = jest.fn();
    await thumbnailMover({ fileMover, imageId, isGood });
    expect(fileMover).toHaveBeenCalledWith(
      `./public/images/backlog/${imageId}`,
      `./public/images/good/${imageId}`
    );
  });

  it('if given a imageId and an argument of bad, move the image to a bad directory', async () => {
    const isGood = false;
    const imageId = 'my-image.jpg';
    const fileMover = jest.fn();
    await thumbnailMover({ fileMover, imageId, isGood });
    expect(fileMover).toHaveBeenCalledWith(
      `./public/images/backlog/${imageId}`,
      `./public/images/bad/${imageId}`
    );
  });
});
