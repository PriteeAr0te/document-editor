
const connectToMongo = require('./db');
const User = require('./models/User');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

app.use(cors());
connectToMongo();
app.use(express.json())

app.use(
  session({
    secret: 'YouarepreetY',
    resave: true,
    saveUninitialized: true,
  })
);


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          console.log('Password match');
          return done(null, user);
        } else {
          console.log('Password mismatch');
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  if (user) {
    return done(null, user.id);
  }
  return done(null, false);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      // console.log("ID:", id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(err => {
      return done(err);
    });
});

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const port = 5000;

io.on("connection", (socket) =>{
    console.log(`User Connected Successfully ${socket.id}`);

    

    socket.on('saveDocument', (savedDocument) =>{
      console.log(savedDocument)
      socket.broadcast.emit("Saved Document", savedDocument)
        io.emit('documentUpdate', savedDocument);
    });

    socket.on("disconnect", () =>{
        console.log("User Disconnected");
    });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/protected'));

server.listen(port, ()=>{
    console.log(`Server is listen on port: ${port}`)
})