var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/all',function(req,res,next){
  res.send("Happy welcome")
})

module.exports = router;
