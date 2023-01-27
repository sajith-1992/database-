var db=require('../configuration/connection')
var collection=require('../configuration/collections')
const bcrypt=require('bcrypt')
const { USER_COLLECTION } = require('../configuration/collections')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve, reject) => {
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(USER_COLLECTION).insertOne(userData).then((data)=>{
              
                resolve(data.insertedId)
            })
            
         

        })

    }, 
    doLogin:(userData)=>{
        return new Promise (async(resolve,reject)=>{
           let loginStatus=false
           let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(user){
                        bcrypt.compare(userData.password,user.password).then((status)=>{
                            if(status){console.log("log in succes");
                            response.user=user
                            response.status=true
                            resolve(response)
                        
                        }
                            else{console.log("login failed");
                              resolve({status:false})      }
                        })
                    }
                })
            } else{console.log("login failed")
                    resolve({status:false})                }

        })
    }
}