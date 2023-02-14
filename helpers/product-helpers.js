 var db=require('../configuration/connection')
var collection=require('../configuration/collections')
const { dnsPrefetchControl } = require('helmet')
const { PRODUCT_COLLECTION } = require('../configuration/collections')
const { response } = require('../app')
var objectId=require('mongodb').ObjectId
 module.exports={
 addProduct:(product,callback)=>{
    
    db.get().collection('product').insertOne(product).then((data)=>{

      //   console.log(data)
        callback(data.insertedId)
         })
        },
        getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        resolve(products)
        })
         
         
        },
        deleteProduct:(proId)=>{
          return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
              resolve(response)
              console.log(response)
            })
          })
        
     },
     getProductDetails:(proId)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
          resolve(product)
        })
      })
     },
     updateProduct:(prodId,proDetails)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(prodId)},{
          $set:{
            Name:proDetails.Name,
            Category:proDetails.Category,
            price:proDetails.Price,
            Discription:proDetails.Discription,

          }
        }).then((response)=>{
          resolve()
        })
        
      })

    
    
    }


  }
