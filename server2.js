const express = require('express');
const fileUpload = require('express-fileupload');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(fileUpload());

// Upload Endpoint
app.post('/photo', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  else {
    console.log('not null');
  }
  let sampleFile = req.files['photo'];
  const file = req.files['photo'];
  console.log(req.files);
  file.mv(`${__dirname}/public/images/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server Started...'));