import { useState } from "react"
 const Header=()=>{return<h1>GIVE FEEDBACK</h1>} 

  const Button=({setNum,num,text})=>{
    return <button onClick={()=>{setNum(num+1)}}>{text}</button>
  }
  const Main=()=>{return <h1>Statistics</h1>
  }
  const StatisticLine=({text,value,percent})=>{
    return (
    <>
    <tr>
    <td>{text}</td>
    <td>{value}{percent}</td>
    </tr>
    </>
    )

  }
  const Statistics=({good,neutral,bad})=>{
    const total=good + neutral + bad
    if(total===0){
      return <h3>No feedback given</h3>
    }
    const average=(good - bad)/total
    const positive=(good/total)*100
    return (
  <>
  <table>
    <tbody>
  <StatisticLine text={"Good"} value={good} />
  <StatisticLine text={"Neutral"} value={neutral} />
  <StatisticLine text={"Bad"} value={bad} />
  <StatisticLine text={"Total"} value={total} />
  <StatisticLine text={"Average"} value={average} />
  <StatisticLine text={"Positive"} value={positive} percent={"%"} />
  </tbody>
  </table>
  </>
  )}
const App=()=>{
  const [good,setGood]=useState(0)
  const [neutral,setNeutral]=useState(0)
  const [bad,setBad]=useState(0)

  return(
    <>
    <Header />
    <Button setNum={setGood} num={good} text={"Good"}/>
    <Button setNum={setNeutral} num={neutral} text={"Neutral"} />
    <Button setNum={setBad} num={bad} text={"Bad"} />
    <Main />
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}
export default App;