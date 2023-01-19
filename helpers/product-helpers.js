 var db=require('../configuration/connection')
var collection=require('../configuration/collections')
 module.exports={
 addProduct:(product,callback)=>{
    
    db.get().collection('product').insertOne(product).then((data)=>{

        console.log(data)
        callback(data.insertedId)
         })
        },
        getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        resolve(products)
        })
         
         
        }
     }



    
