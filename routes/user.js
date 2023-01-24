var express = require('express');
const { response } = require('../app');
var router = express.Router();
const productHealper=require('../helpers/product-helpers')
const userHealpers=require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  productHealper.getAllProducts().then((products)=>{
     console.log(products)
    res.render('./user/view-userproducts', { products,admin:false });
   })


});
router.get('/login',(req,res)=>{
  res.render('./user/login')
})
router.get('/signup',(req,res)=>{
  res.render('./user/signup')
})
router.post('/signup',(req,res)=>{
userHealpers.doSignup(req.body).then((response)=>{
  console.log(response)
})
})


module.exports = router;
