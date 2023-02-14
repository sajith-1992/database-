const cookieParser = require('cookie-parser');
var express = require('express');
const { response } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
const productHealper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {

 productHealper.getAllProducts().then((products)=>{
  //console.log(products)
  res.render('./admin/view-products',{products,admin:true});
 })


  
});
router.get('/add-product',(req,res)=>{
  res.render('./admin/add-product')
})
router.post('/add-product',(req,res)=>{
  // console.log(req.body);
  // console.log(req.files.Image)
  // console.log(req.files.image);
   productHealper.addProduct(req.body,(Id)=>{
    console.log(Id)
    let image=req.files.Image
    image.mv('./public/product-images/'+Id+'.jpg',(err,done)=>{
      if(!err){
        res.render('./admin/add-Product')
      }else{console.log(err)}
    })

  })
 
   })
   router.get('/delete-product/:id',(req,res)=>{
    let proId=req.params.id
  console.log(proId)
 productHealper.deleteProduct(proId).then((response)=>{
  res.redirect('/admin')
 })
 


    

    
   })
router.get("/edit-product/:id",async(req,res)=>{
let product=await productHealper.getProductDetails(req.params.id)
// console.log(product)  
res.render('./admin/edit-product',{product})
})
router.post("/edit-product/:id",(req,res)=>{
console.log(req.body)
let id=req.params.id
  productHealper.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
if(req.files.Image){
  let image= req.files.Image  
  image.mv('./public/product-images/'+id+'.jpg')}
  })
  
})


module.exports = router;
