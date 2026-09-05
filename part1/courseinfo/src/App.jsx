import { useState } from "react"

  const Part=(props)=>{
    return(
      <>
      <p>{props.parts.name} {props.parts.exercises}</p>
      </>
    )
  }
  
    const Content=(props)=>{
    return(
      <>
      <Part parts={props.parts[0]} />
      <Part parts={props.parts[1]} />
      <Part parts={props.parts[2]} />

    </>
    )
  }
  const Header=(props)=>{
    return(
      <h1>{props.name}</h1>
    )
  }
  
 
  const Total=(props)=>{
    return(
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}
// testing-------------------------------------------
 /*   const Timer=()=>{
      const [time,setTime]=useState(0)
      setTimeout(()=>{
        setTime(time+1)
      },1000)
        console.log('reading...' + time)
      return <p>{time}</p>
    }
      */
     /*const Handler=()=>{
      const [counter,setCounter]=useState(0)
       return <button onClick={()=>{setCounter(counter+1)}}>COUNTER ...{counter}</button>
     }
       */
      const Test=()=>{

        const [clicked, setClicked]=useState({
          lift:0,
          right:0
        })
        const [allClicked,setAllClicked]=useState([])

        const handleClickedLift=()=>{
            console.log("clicked on lift")
            setAllClicked(allClicked.concat('L'))
          setClicked({
            ...clicked,
            lift: clicked.lift+1
          })
        console.log(allClicked)
        }
        const handleClickedright=()=>{
            console.log("clicked on right")
            setAllClicked(allClicked.concat('R'))
            setClicked({
              ...clicked,
              right: clicked.right+1
            })
        console.log(allClicked)
        }
        
        return(
          <>
          <div>
            <h1>{allClicked.join('')}</h1>
            <button onClick={handleClickedLift} >LIFT: {clicked.lift}</button>
            <button onClick={handleClickedright} >RIGHT: {clicked.right}</button>
          </div>
          </>
        )

      }
      
     // outTesting----------------------------------------------------
const App = (props) => {
  const course ={
   name: 'Half Stack application development',
   parts: [
    { 
    name:'Fundamentals of React',
    exercises: 10}
  ,{
    name: 'Using props to pass data',
    exercises: 7}
  ,{
    name: 'State of a component',
    exercises: 14}
  ]
  }
  
  return (
    <div>
     <Header name={course.name} />
     <Content parts={course.parts}/>
     <Total parts={course.parts} />
     <Test />

    </div>
  )
}

export default App