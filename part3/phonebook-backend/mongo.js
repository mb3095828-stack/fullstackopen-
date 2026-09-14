require('dotenv').config()
const mongoose=require('mongoose')
const dns=require('node:dns')
dns.setServers(['8.8.8.8'])

const password=process.argv[2]
const name=process.argv[3]
const number=process.argv[4]



const url= process.env.MANGODB_URL
mongoose.connect(url,{ family: 4 })

const personSchema=new mongoose.Schema({
    name:String,
    number:String,
})

const Person=mongoose.model('Person',personSchema)

const person=new Person({
    name:name,
    number:number,
})
if(person.name && person.number){
person.save().then(response=>{
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()

})
}else{
    Person.find({}).then(persons=>{
            console.log('phonebook:')
            persons.forEach(person=>{
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()

    })

}



