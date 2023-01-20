var express = require('express');
var router = express.Router();
var productHealper=require('../helpers/product-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  productHealper.getAllProducts().then((products)=>{
     console.log(products)
    res.render('./user/view-userproducts', { products,admin:false });
   })



});

module.exports = router;
