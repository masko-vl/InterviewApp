import React, { useEffect, createContext, useReducer} from 'react'
import { getEvents } from '../sevices/getEvents';


const Context = createContext({})


export const GasDataProvider = ({children}) => {
  const [data, dispatch] = useReducer(
    imagesReducer,
    initialImages
  );

  
  const callData = async () => {

        const response = await getEvents();
        
        if (response) {
            dispatch({ type: 'GET_IMAGES', payload: response });
        } else {
            console.error('No response received.');
        }
  
  };

  useEffect(() => {
    callData();
  }, []);
 

  return <Context.Provider value={{data, dispatch}}>
    {children}
  </Context.Provider>
}


const  imagesReducer =(data, action) => {
  switch (action.type) {
    case 'GET_IMAGES': {
      return {...data, images: action.payload};
    }
    case 'SET_FILTER_LEAK_GAS': {
      return {...data, filterGas: action.payload};;
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
const initialImages = {images: [],  filterGas: false};

export default Context