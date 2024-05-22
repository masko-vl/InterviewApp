import axios from "axios";
const baseURL = "http://localhost:7071"; 

export const getEvents = async () => {

  return await axios.get(`${baseURL}/events`)
        .then((result) => {
          return result.data.scanResults;
        })
        .catch((error) => {
          new Error("Error while retrieving data")
          return null;
        });

  };