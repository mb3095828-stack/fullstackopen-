import './Notification.css'
const Notification=({message})=>{
    if(message === null || message===''){
        return null
    }

    return(
        <div className="error">{message}</div>
    )
}
const NotificationSuccss=({message})=>{
    if(message === null || message===''){
        return null
    }

    return(
        <div className="succss">{message}</div>
    )
}


export  {Notification,NotificationSuccss}