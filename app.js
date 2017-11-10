var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var nunjucks = require('nunjucks');

app.use(express.static(path.join(__dirname, '/public'))); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var env = nunjucks.configure('views', {noCache: true});
var models = require('./models');

app.set('view engine', 'html');

app.engine('html', nunjucks.render);

// app.listen(3000, function () {
//         console.log('Server is listening on port 3000!');
//     });

models.User.sync({force: true})
.then(function () {
    return models.Page.sync()
})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);


///When {force: true}, and error arises
// models.db.sync({})
// .then(function () {
//     return models.Page.sync({})
// })
// .then(function () {
//     // make sure to replace the name below with your express app
//     app.listen(3000, function () {
//         console.log('Server is listening on port 3000!');
//     });
// })
// .catch(console.error);

app.get('/', function(req, res, next){
	res.render('index');
});