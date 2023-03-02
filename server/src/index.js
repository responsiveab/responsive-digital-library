import bodyParser from 'body-parser';
import express from 'express';
import router from '././routes';
import bookRouter from './routes/book.routes';
import userRouter from './routes/user.routes';
import tagRouter from './routes/tag.routes';
import './config/mongodb.config';

var cors = require('cors')

const app = express();
const PORT = 8080;

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use('/api', router);
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/tags', tagRouter);

app.get('/', function(req, res){
  res.send('Server: Hello!');
});

const server = app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

export default app;
module.export = server
