const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload');
const cors = require('cors');

const authRouter = require('./src/routes/authRoute')


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(fileupload())
app.use(cors())

app.use('/api/auth',authRouter  )


mongoose.connect(
  'mongodb://localhost:27017/MyVideoStream',
  { useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    app.listen(3001, () => console.log('server started'));
  }
);
