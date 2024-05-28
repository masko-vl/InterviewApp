import axios from "axios";
const baseURL = "http://localhost:7071"; 


export const getCameras = async () => {

  return await axios.get(`${baseURL}/camera`)
        .then( (result) => result.data)
        .catch((error) => {
          new Error("Error while retrieving data")
          return null;
        });

  };