import React, {useState, createContext} from 'react';

export const StateContext = createContext([]);

const StateProvider = ({children}) => {
    const [filesToShow, setFilesToShow] = useState([]);


  return ( 
    <StateContext.Provider value={{ filesToShow, setFilesToShow }}>
        {children}
    </StateContext.Provider>
  )
}

export default StateProvider