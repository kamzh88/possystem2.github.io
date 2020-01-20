var express = require("express");
var path = require("path");
var expbs = require('express-handlebars');

var PORT = process.env.PORT || 8080;
var app = express();

app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require("./controllers/admin_controller.js");
app.use(routes);

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});