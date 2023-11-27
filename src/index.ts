import express from 'express';
import cors from 'cors';
import { fileMover } from './fileMover';
import { thumbnailMover } from './thumbnailMover';
import { getRandomImage } from './getRandomImage';
import { getImagesInDirectory } from './getImagesInDirectory';

const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${res.statusCode}`);
  next();
});
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.static('public'));
app.use(express.json());
app.options('/thumbnails/:id/votes', cors());
app.post('/thumbnails/:id/votes', cors(), async (req, res) => {
  try {
    const { id: imageId } = req.params;
    const { isGood } = req.body;
    await thumbnailMover({
      fileMover,
      imageId,
      isGood,
    });
    res.send('success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/thumbnails/random', async (req, res) => {
  const randomImagePath = await getRandomImage({ getImagesInDirectory });
  res.send(randomImagePath);
});

app.listen(8080);
