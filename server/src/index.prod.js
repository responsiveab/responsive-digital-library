import bodyParser from 'body-parser';
import express from 'express';
import router from '././routes';
import bookRouter from './routes/book.routes';
import userRouter from './routes/user.routes';
import tagRouter from './routes/tag.routes';
import path from 'path';
import './config/mongodb.config';

var cors = require('cors')

const app = express();
const PORT = process.env.BUILD_PORT || 8080;

const CLIENT_BUILD_PATH = path.join(__dirname, "../../client/build");

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//  Route for client
app.use(express.static(CLIENT_BUILD_PATH));

// Server React Client
app.get("/", function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});

app.use('/api', router);
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/tags', tagRouter);

app.get('/', function(req, res){
  res.send('Server: Hello!');
});

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

export default app;
