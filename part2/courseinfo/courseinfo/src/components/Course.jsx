
const Header=({title})=>{
    return <h1>{title}</h1>

}
const Part=({part})=>{
    return (<p>{part.name}: {part.exercises}</p>)
}
const Total=({part})=>{
    const all=part.reduce((s,{exercises})=>{
        return s + exercises
    },0)
    
    return (
        <h3>Total of {all}  exercises</h3>
    )
}

const Content=({array})=>{
   return(
    <>
        {array.map((parts)=>{return(<Part key={parts.id} part={parts} />)})}
    </>
   )
}

const Course=({course})=>{

 return(
    <>
    <Header title={course.name} />
    <Content array={course.parts} />
    <Total part={course.parts}  />
    </>
 )

}
export default Course;