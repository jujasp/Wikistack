const express =  require('express');
const router = express.Router();
module.exports = router;
const wikiRouter = require('./wiki');
const user =  require('./user.js');
router.use('/wiki', wikiRouter);

