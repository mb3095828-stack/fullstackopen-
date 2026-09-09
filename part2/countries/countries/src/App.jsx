import { useEffect, useState } from "react"
import axios from 'axios'
 const SearchFilter=({countrie,search,setSearch})=>{
  const countrieFilter=countrie.filter((oneCountrie)=> oneCountrie.name.common.toLowerCase().includes(search.toLowerCase()))
    if(search===''){return null 
    }else if(countrieFilter.length===1){
      return(
        <>
        {countrieFilter.map((item)=>{return(
        
          <div key={item.cca3}>
            <h1>{item.name.common}</h1>
            <p>{item.capital[0]}</p>
            <p>{item.area}</p>
            <h1>languages</h1>
            <ul>
            {Object.values(item.languages).map((item)=>{return <li key={item} >{item}</li>})}
            </ul>
            <img src={item.flags.png} />
          </div>

        )})}
        </>
      )
    }else if(countrieFilter.length<=10){
      return(
      <div>
        {countrieFilter.map((item)=>{return <div key={item.cca3} >{item.name.common}  <button onClick={()=>{setSearch(item.name.common)}} > show </button></div>})}
      </div>
      )
    }else{return <h3>Too many matches, specify another filter</h3>
    }
    
    
    }


function App() {
  const [search,setSearch]=useState('')
  const [countrie,setCountrie]=useState([])

  const urlCountrie="https://studies.cs.helsinki.fi/restcountries/api/all"


  useEffect(()=>{
    axios
  .get(urlCountrie)
  .then(response=>{setCountrie(response.data)})

  },[])
    const valueInput=(event)=>{
    const val=event.target.value
    setSearch(val)

  }    

  return(
    <>
    <div>
      find countries: <input type="text" value={search} onChange={valueInput} />
    </div>
    <SearchFilter countrie={countrie} search={search} setSearch={setSearch} />
    </>
  )
}

export default App
