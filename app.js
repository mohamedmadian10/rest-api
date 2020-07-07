const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const deviceRouter = require('./Routes/deviceRouter');
// open server
const app = express();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect('mongodb://localhost:27017/apiDataBase', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected ...'))
  .catch((error) => console.log(error));

// setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routing
app.use('/api', authRouter);
app.use('/api', deviceRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('its listening......');
});
module.exports = app;
