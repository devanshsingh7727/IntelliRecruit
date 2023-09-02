import * as multer from 'multer';
import nextConnect from 'next-connect';
const pdf = require('pdf-parse');

const inMemoryStorage = multer.memoryStorage(),
  uploadStrategy = multer({ storage: inMemoryStorage }).single('file');

const handler = nextConnect();

export const config = {
  api: {
    // externalResolver: true,
    bodyParser: false,
  },
};

handler.post(uploadStrategy, async (req, res) => {
  try {
    if (req.file) {
      let options = {
        max: 10,
      };
      pdf(req.file.buffer, options)
        .then(function (data) {
          res.status(200).json({ test: JSON.stringify(data.text) });
        })
        .catch((err) => {
          res
            .status(err && err?.responseCode ? err?.responseCode : 500)
            .json({ message: 'Internal server error!!!', error: err });
        });
    } else {
      res.status(400).send('Please attach an image!');
    }
  } catch (err) {
    res
      .status(err && err?.responseCode ? err?.responseCode : 500)
      .json({ message: 'Internal server error!!!', error: err });
  }
});
export default handler;
