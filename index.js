const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userroutes');
const boardRoutes = require('./routes/boardroutes');
const containerRoutes = require('./routes/containerroutes');
const cardRoutes = require('./routes/cardroutes');
const bodyParser = require('body-parser');
const { secretKey } = require('./config/secret_key');


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.set('jwt-secret', secretKey);
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/board', boardRoutes);
app.use('/container', containerRoutes);
app.use('/card', cardRoutes);

app.listen('4000', (rea, res) => {
  console.log('????연결 되었습니다');
});



