import React, { createContext, useReducer } from 'react';
import { getEvents } from '../sevices/getEvents';
import { getCameras } from '../sevices/getCamaras';


const Context = createContext({})


export const GasDataProvider = ({children}) => {
  const [data, dispatch] = useReducer(
    imagesReducer,
    initialImages
  );

  
  const callEvents = async () => {
    dispatch({ type: 'SET_IS_LOADING', payload: true });

        const response = await getEvents();
        
        if (response) {
            dispatch({ type: 'SET_IMAGES', payload: response });
        } else {
            console.error('No response received.');
        }
        dispatch({ type: 'SET_IS_LOADING', payload: false });
  
  };

  const callCameras = async () => {
    dispatch({ type: 'SET_IS_LOADING', payload: true });
  
        const response = await getCameras();
        
        if (response) {
            dispatch({ type: 'SET_CAMERAS', payload: response });
        } else {
            console.error('No response received.');
        }
        dispatch({ type: 'SET_IS_LOADING', payload: false });
  
  };
 

  return <Context.Provider value={{data, callEvents, callCameras, dispatch}}>
    {children}
  </Context.Provider>
}


const  imagesReducer =(data, action) => {
  switch (action.type) {
   
    case 'SET_IMAGES': {
      return {...data, images: action.payload};
    }

    case 'SET_CAMERAS': {
      return {...data, cameras: action.payload};
    }

    case 'SET_FILTER_LEAK_GAS': {
      return {...data, filterGas: action.payload};;
    }

    case 'SET_IS_LOADING': {
      return {...data, isLoading: action.payload};;
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
const initialImages = {images: [], cameras:[],  filterGas: false, isLoading: false};

export default Context