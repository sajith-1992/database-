var express = require('express');
const session = require('express-session');
const { response } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
const productHelper=require('../helpers/product-helpers')
const userHelpers=require('../helpers/user-helpers')
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}




/* GET home page. */
router.get('/', function(req, res, next) {
 let user=req.session.user
//  console.log(user)
  productHelper.getAllProducts().then((products)=>{
    //  console.log(products)
    res.render('./user/view-userproducts', { products,admin:false,user });
   })


});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else
  res.render('./user/login',{"logErr":req.session.loginErr})
  
})
router.get('/signup',(req,res)=>{
  res.render('./user/signup')
})
router.post('/signup',(req,res)=>{
userHelpers.doSignup(req.body).then((response)=>{
  console.log(response)
  req.session.loggedIn=true
  req.session.user=response
  res.redirect('/')
})
})
router.post('/login',(req,res)=>{ 
  // console.log (req.body)
userHelpers.doLogin(req.body).then((response)=>{
  if(response.status){
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/')
 }else{
  req.session.loginErr="inavlid username or password"
  res.redirect('/login')
 }
})

 }
)
router.get('/logout',(req,res)=>{
 req.session.destroy()
  res.redirect('/')

})
router.get('/cart',verifyLogin,(req,res)=>{
 
  res.render('./user/cart')
})

router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
  console.log(req.params.id)
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.redirect('/')
  })
})

module.exports = router;
