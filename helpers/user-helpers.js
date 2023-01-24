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

    }
}