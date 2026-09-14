require('dotenv').config()
const Person=require('./models/person')
const express=require('express')
const morgan=require('morgan')

const app=express()
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('body',(req) => {
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
  return
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

app.get('/api/persons',(request,response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error: error.message })
    })

})

app.get('/info',(request,response,next) => {
  const time=new Date().toString()
  console.log(time)
  Person.countDocuments({})
    .then(people => {
      response.send(`
        <h1>Phonebook has info for ${people} people</h1>
        <h2>${time}</h2>
        `)
    })


    .catch(error => next(error))
})

app.get('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  Person.findById(id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id',(request,response,next) => {
  console.log(request.params.id)
  Person.findByIdAndDelete(request.params.id).then(() => {
    console.log('deleted!')
    response.status(204).end()
  })
    .catch(error => next(error))
})

app.post('/api/persons',(req,res,next) => {

  const newPerson=new Person({
    name:req.body.name,
    number:req.body.number
  })

  newPerson.save()
    .then(savedPerson => {
      console.log('saved!')
      res.json(savedPerson)
    })
    .catch(error => {next(error)})

})
app.put('/api/persons/:id',(req,res,next) => {
  const { name,number }=req.body
  console.log('here :',req.params.id)

  Person.findById(req.params.id)

    .then(updatePerson => {
      if(!updatePerson){
        return res.status(404).end()
      }
      updatePerson.name=name
      updatePerson.number=number

      return updatePerson.save().then(savedPerson => {
        res.json(savedPerson)
      })
    })
    .catch(error => next(error))

})

const errorHandler=(error,request,response,next) => {
  console.log(error.message)
  if(error.name==='CastError'){
    response.status(400).send({
      error: 'malformatted id'
    })
  }else if(error.name==='ValidationError'){
    response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
const PORT=process.env.PORT || 3001
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})