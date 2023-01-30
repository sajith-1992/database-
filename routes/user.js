var express = require('express');
const { response } = require('../app');
var router = express.Router();
const productHealper=require('../helpers/product-helpers')
const userHelpers=require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
 let user=req.session.user
//  console.log(user)
  productHealper.getAllProducts().then((products)=>{
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
userHealpers.doSignup(req.body).then((response)=>{
  console.log(response)
})
})
router.post('/login',(req,res)=>{ 
  // console.log (req.body)
userHelpers.doLogin(req.body).then((response)=>{
  if(response.status){
    req.session.loggedIn=true
    req.session.user=response.user
    res.redirect('/')
 }else{
  req.session.loginErr=true
  res.redirect('/login')
 }
})

 }
)
router.get('/logout',(req,res)=>{
 req.session.destroy()
  res.redirect('/')

})
module.exports = router;
