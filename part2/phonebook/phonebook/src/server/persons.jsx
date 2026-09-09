
        import axios from "axios"
        const urlServer="http://localhost:3001/persons"

        const getDataFromServer=()=>{ 
        return axios
        .get(urlServer)
        .then(response=>{
            return response.data}) 
      }
    

        const sendDataToServer=(createObject)=>{
       return axios
      .post("http://localhost:3001/persons",createObject)
      .then(request=>{
        return request.data})
      //console.log("here dune post to server " )
        }

        const removeDataFromServer=(person)=>{
            return axios
            .delete(`${urlServer}/${person.id}`)
            .then(response=>{return response.data})
        }

        const updateDataFromServer=(update)=>{
           return axios
          .put(`http://localhost:3001/persons/${update.id}`,update)
          .then(response=>{return response.data})

        }
      export default {getDataFromServer,sendDataToServer,removeDataFromServer,updateDataFromServer}