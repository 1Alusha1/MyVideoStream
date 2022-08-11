const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');

const authRouter = require('./src/routes/authRoute');
const userRouter = require('./src/routes/userRoute');
const videoRouter = require('./src/routes/videoRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  fileupload({
    limits: { fileSize: 500 * 1024 * 1024 },
  })
);
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/video', videoRouter);

mongoose.connect(
  'mongodb://localhost:27017/MyVideoStream',
  { useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    app.listen(3001, () => console.log('server started'));
  }
);
