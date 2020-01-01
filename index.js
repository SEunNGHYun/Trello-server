const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const controller = require('./controller/user');
const { secretKey } = require('./config/secret_key');
const userRoutes = require('./routes/userroutes');
const boardRoutes = require('./routes/boardroutes');
const containerRoutes = require('./routes/containerroutes');
const cardRoutes = require('./routes/cardroutes');



app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true
}));
app.set('jwt-secret', secretKey);
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());



app.use('/user', userRoutes);

app.all('/*', controller.usercheck);
app.get('/', controller.check);

app.use('/board', boardRoutes);
app.use('/container', containerRoutes);
app.use('/card', cardRoutes);

app.listen('4000', (rea, res) => {
  console.log('????연결 되었습니다');
});



