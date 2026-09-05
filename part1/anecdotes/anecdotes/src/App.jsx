import { useState } from 'react'

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const MostVote=({vote})=>{
   const mostValue= Math.max(...vote)
   const mostNumber=vote.indexOf(mostValue)

  return(
    <>
    <h1>Anecdote with most votes</h1>
    <h3>{anecdotes[mostNumber]} has {mostValue} votes</h3>
    </>
  )}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [vote,setVote]=useState([0,0,0,0,0,0,0,0])

  const handleButton=()=>{
      const round=Math.floor(Math.random() * anecdotes.length)
    setSelected(round)
  }
  const handleVote=()=>{
    const copy=[...vote]
    copy[selected]= copy[selected]+1
    setVote(copy)
  }

  return (
    <div>
      <h1>{anecdotes[selected]} has {vote[selected]} vote</h1>

      <div>
      <button onClick={handleVote} >Vote</button>
      <button onClick={handleButton} >next anecdotes</button>
      </div>
      <MostVote vote={vote} />

    </div>
  )
}

export default App