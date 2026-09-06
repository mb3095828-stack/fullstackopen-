import { useState } from "react"

function App() {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const takeName=(event)=>{
    setNewName(event.target.value)
  //  console.log("this is what inside useState",newName,persons)
  }


  const addHandle=(event)=>{
    event.preventDefault()
        const result=persons.some((names)=>{
      return names.name===newName
    })
    const createObject={
      name:newName
    }
    const newPerson=persons.concat(createObject)
    
   // console.log("this is new person: ",newPerson)

    if(result===true){
      setNewName('')
      alert(`${newName} is already added to phonebook`)
      return 
    }
    
    setPersons(newPerson)
    setNewName('')
    console.log(newPerson)
  }


  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addHandle} >
        <div>
          name: <input value={newName} onChange={takeName}  />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    <div>
      
      {persons.map((person)=>{return <div key={person.name}> {person.name}</div>})}
    </div>
    </>
  )
}

export default App
