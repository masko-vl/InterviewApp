import axios from "axios";
const baseURL = "http://localhost:7071"; 

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export const getEvents = async () => {

  return await axios.get(`${baseURL}/events`)
        .then( async (result) => {
          console.log('before waiting');
          await wait(3000)
          console.log('afteeer'); 
          return result.data.scanResults;
        })
        .catch((error) => {
          new Error("Error while retrieving data")
          return null;
        });

  };