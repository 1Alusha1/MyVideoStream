const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(fileupload())
app.use(cors())


mongoose.connect(
  'mongodb://localhost:27017/MyTube',
  { useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    app.listen(3001, () => console.log('server started'));
  }
);
