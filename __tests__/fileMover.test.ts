import fs from 'fs';
import { fileMover } from '../src/fileMover';

jest.mock('fs');

describe('fileMover', () => {
  beforeEach(() => {
    (fs.renameSync as jest.Mock).mockImplementation(() => null);
  });

  it('should try to move a file using node fs', async () => {
    const src = './source/a.jpg';
    const dst = './destination/a.jpg';
    await fileMover(src, dst);
    expect(fs.renameSync).toHaveBeenCalledWith(src, dst);
  });
});
