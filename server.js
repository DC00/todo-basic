var express = require("express"),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    path = require('path'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var todos = {
  "wake up" : false,
  "work out" : false
}

// View all todos on index page
app.get('/', (req, res) => {
  var incomplete_todos = []
  Object.keys(todos).forEach(k => {
    if (!todos[k]) incomplete_todos.push(k);
  });
  res.render("index", { "todos": incomplete_todos });
});

// Create a todo if non-empty name
app.post('/add', (req, res) => {
  console.log(req.body.name);
  if (req.body.name) todos[req.body.name] = false;
  res.status(200).redirect('/')
});

// Complete a todo, stored as true after
app.post('/done', (req, res) => {
  if (req.body.name in todos) todos[req.body.name] = true
  res.status(200).redirect('/')
});

app.listen(port, () => { console.log("listening on port", port) });
