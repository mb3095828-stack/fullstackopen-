require('dotenv').config()
const mongoose=require('mongoose')
const dns=require('node:dns')
dns.setServers(['8.8.8.8'])

const url=process.env.MONGODB_URL

const PORT=process.env.PORT
console.log(url,PORT)
mongoose.connect(url,{ family:4 })

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required: true
    },
    number:{
    type: String,
    minLength: 8,
    validate: {
        validator: 
            function (value){
                return /^\d{2,3}-\d+$/.test(value)
            },
            message: props=> `${props.value} is not a valid phone number `
    }
}})

personSchema.set('toJSON',{
    transform: (document,retrunObject)=>{
        retrunObject.id=retrunObject._id.toString()

        delete retrunObject._id
        delete retrunObject.__v
    }
})

const Person=mongoose.model('Person',personSchema)

module.exports=Person