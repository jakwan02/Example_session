const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
// const RedisStore = require('connect-redis')(session);
// const redis = require('redis');

const app = express();
app.set('port', 8000);

// const redisClient = redis.createClient({
//   url: '',
//   password: '',
//   legacyMode: true
// });
// redisClient.on('connect', () => {
//   console.log('connect on redis');
// });
// redisClient.on('error', (err) => {
//   console.log('Redis connect error: ', err);
// });
// redisClient.connect();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(session({
  // store: new RedisStore({ client: redisClient }),
  secret: 'mycookie',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'my_cookie'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/session', (req, res) => {
  try {
    req.session.user = {
      name: 'jk',
      age: '22'
    };

    res.send('session data 생성');
  } catch (err) {
    console.log(err);
  }
});

app.get('/confirm', (req, res) => {
  try {
    let data = '';
    if (req.session.user) {
      data = req.session.user;
    }
    
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(app.get('port'), () => {
  console.log('running on port', app.get('port'));
});