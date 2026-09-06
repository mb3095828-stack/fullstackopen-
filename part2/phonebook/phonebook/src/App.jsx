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

  const stopRelod=(event)=>{
    event.preventDefault()
    
  }
  const addHandle=()=>{
    const createOpjecit={
      name:newName
    }
    const newPerson=persons.concat(createOpjecit)
    
    setPersons(newPerson)
    setNewName('')
    console.log(newPerson)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={stopRelod} >
        <div>
          name: <input value={newName} onChange={takeName}  />
        </div>
        <div>
          <button type="submit" onClick={addHandle} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    <div>
      {persons.map((theName)=>{return <div key={theName.name}>debug: {theName.name}</div>})}
    </div>
    </>
  )
}

export default App
