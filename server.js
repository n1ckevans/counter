const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('static', __dirname + '/static');


app.listen(8000, () => console.log("listening on port 8000"));

app.get('/', (req, res) => {
  
  console.log(req.session.counter);
  if (req.session.counter == null){
    req.session.counter = 1;
    console.log(req.session.counter);
    res.render('index', {
      layout:false,
      session: req.session
  })
  }
  else {
    req.session.counter ++;
    console.log(req.session.counter);
    res.render('index', {
      layout:false,
      session: req.session
  })
  }
  

});

app.post('/increase', (req, res) => {
  req.session.counter ++;
  res.redirect('/');
});

app.post('/reset', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});