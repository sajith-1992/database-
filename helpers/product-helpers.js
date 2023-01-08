 var db=require('../configuration/connection')
 module.exports={
 addProduct:(product,callback)=>{
    
    db.get().collection('product').insertOne(product).then((data)=>{
             callback(true)
         })
        }
     }



    
