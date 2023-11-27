// import { mocked } from 'jest-mock';
import fs from 'fs';
import { getImagesInDirectory } from '../src/getImagesInDirectory';

jest.mock('fs');

describe('getImagesInDirectory', () => {
  beforeEach(() => {
    (fs.readdirSync as jest.Mock).mockImplementation(() => [
      'a.png',
      'b.png',
      'c.png',
    ]);
  });

  it('returns a list of all files in a directory', async () => {
    const images = getImagesInDirectory('./public/images/backlog');
    expect(fs.readdirSync).toHaveBeenCalledWith('./public/images/backlog');
    expect(images).toEqual(['a.png', 'b.png', 'c.png']);
  });
});
