const express=require('express')
const morgan=require('morgan')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('body',(req,res)=>{
    if(req.method === 'POST'){
        return JSON.stringify(req.body)
    }
    return
    })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons=[
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]
const creatId=()=>{
 const creat=Math.floor(Math.random()*1000)
 return String(creat)
}

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})
app.get('/info',(request,response)=>{
    const time=new Date().toString()
    console.log(time)
    const people=persons.length
    response.send(`
        <h1>Phonebook has info for ${people} people</h1>
        <h2>${time}</h2>
        `)
})

app.get('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    const person=persons.find(n=>n.id===id)
    if(person){
    response.json(person)
    }else{
        response.status(404).end()
    }
})
app.delete('/api/persons/:id',(request,respons)=>{
    const id=request.params.id
    persons=persons.filter(person=> person.id !==id)
    respons.status(204).end()

})
app.post('/api/persons',(req,res)=>{
   const addPerson=req.body
   if(!addPerson.name || !addPerson.number){
   return res.status(400).json({
    error:"error: 'name or number missing"
})
   }
   const sameName=persons.find(n=>n.name === addPerson.name)
   if(sameName){
    return res.status(400).json({
        error: 'name must be unique'
})
   }
   const newPerson={
    id:creatId(),
    name:addPerson.name,
    number:addPerson.number    
   }
   
   persons=persons.concat(newPerson)
   res.json(newPerson)
})
const PORT=process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})