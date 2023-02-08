const cookieParser = require('cookie-parser');
var express = require('express');
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
 router.get('/edit-product/:id',(req,res)=>{
  res.render("./admin/edit-product")
 })


    

    
   })



module.exports = router;
