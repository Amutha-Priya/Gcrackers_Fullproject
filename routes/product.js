var express = require('express');
var router = express.Router();
var productcontroller=require('../controllers/productcontroller')


// router.get('/',function(req,res)    {
//     res.send("I m in product")
//     console.log("hi");
    
// });

router.get('/',productcontroller.getAllProducts)
router.post('/',productcontroller.createProduct)

module.exports = router;

