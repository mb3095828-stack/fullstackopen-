import { useEffect, useState } from "react"
import fromServer from './server/persons'
import {Notification,NotificationSuccss} from "./components/Notification"

const Filter=({value,onChange})=>{
  return <div>filter shown with <input value={value} onChange={onChange} /></div>
}

const PersonForm=({submit,nameVal,numVal,nameChange,numChange})=>{
  return (
      <form onSubmit={submit} >
        <div>
          name: <input value={nameVal} onChange={nameChange}  />
        </div>
        <br/>
        <div>
          number: <input value={numVal} onChange={numChange}  />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}
const Persons=({persons,removePerson})=>{
  return <div>{persons.map((person)=>{return <div key={person.id}> {person.name} {person.number}    <button  onClick={()=>removePerson(person)} >Delet</button></div>})}</div>
}


function App() {

    const [persons, setPersons] = useState([])
    

     useEffect(()=>{
        fromServer
        .getDataFromServer()
        .then(response=>{setPersons(response)})

      },[])

  const [newName, setNewName] = useState('')
  const [number,setNumber]=useState('')
  const [filterShown,setFilterShown]=useState('')
  const [errorMessage,setErrorMessage]=useState('')
  const [sucssfulmessage,setSucssfulmessage]=useState('')

  const takeName=(event)=>{
    setNewName(event.target.value)
  }
 const takeNumber=(event)=>{
  setNumber(event.target.value)

 }
 const takeSrearch=(event)=>{
  setFilterShown(event.target.value)

}



  const addHandle=(event)=>{
    event.preventDefault()
        const resultName=persons.some((person)=>{
      return person.name===newName
    })
    const createObject={
      name:newName,
      number:number
    }


    if(resultName===true){
        const confirm=window.confirm(`${newName} already exists, do you want to replace the old number with the new one?`)
        const updateName=persons.find(n=> n.name===newName)
       
        const update={...updateName,name:newName,number:number,content:"existing"}

        if(confirm){
          fromServer
          .updateDataFromServer(update)
          .then(response=>{
            setPersons(
              persons.map(person=>person.id===response.id ? response : person)  
            )
        setSucssfulmessage(`Updated ${newName}`)
        setTimeout(()=>{
        setSucssfulmessage(null)
       },5000)
          })
        .catch(error=>{
          setErrorMessage(error.response.data.error)
        console.log(error.response)
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
      })


        }

      return 
    }
    
      fromServer
      .sendDataToServer(createObject)
      .then(response=>{setPersons(persons.concat(response))
        setSucssfulmessage(`Added ${newName}`)
        setTimeout(()=>{
        setSucssfulmessage(null)
       },5000)
      })
      .catch(error=>{
      setErrorMessage(error.error)
      setTimeout(()=>{
      setErrorMessage(null)
      },5000)
      })
    setNewName('')
    setNumber('')



  }
  const removePerson=(person)=>{
  const confirm=window.confirm(`Delet ${person.name}?`)
   if(confirm){
    fromServer
    .removeDataFromServer(person)
      .then(()=>{setPersons(persons.filter(item=> item.id !== person.id))
       setSucssfulmessage(`removed ${person.name}`)
       setTimeout(()=>{
        setSucssfulmessage(null)
       },5000)

      })
      .catch(error=>{
        setErrorMessage(`Note ${person.name} was already removed from server`)
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
      })

    
  }else console.log("user clicked no")
  
}

const replacingData=(person)=>{
  const confirm=window.confirm(`${person.name} already exists, do you want to replace the old number with the new one?`)
  if(confirm){

  }
}
  
      const searchBox=
    filterShown ==='' ? persons : 
    persons.filter((person)=> person.name.toLowerCase().includes(filterShown.toLowerCase())) 

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <NotificationSuccss message={sucssfulmessage} />
      <Filter value={filterShown} onChange={takeSrearch}/>
      <h1>add a new</h1>
      <PersonForm submit={addHandle} nameVal={newName} numVal={number} nameChange={takeName} numChange={takeNumber} />
      <h2>Numbers</h2>
      <Persons persons={searchBox} removePerson={removePerson} />
    </>
  )
}

export default App
