
const express =  require('express');
const router = express.Router();
module.exports = router;
router.get('/', function(req, res, next) {
  res.send('got to GET /wiki/');
});


router.get('/add', function(req, res) {
  res.render('addpage');
});

router.get('/', function(req, res, next) {
  res.redirect('/');
});

var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.post('/', function(req, res, next) {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
 
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  console.log(page);
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  res.json(page.title);
  // -> after save -> res.redirect('/');
});