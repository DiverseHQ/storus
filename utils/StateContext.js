import React, {useState, useEffect, createContext} from 'react';
import {useAccount} from 'wagmi';
import connectContract from './connectContract';

export const StateContext = createContext([]);

const StateProvider = ({children}) => {
    const[publicKey,setPublicKey] = useState(null);
    const {address} = useAccount();
    

  return ( 
        <StateContext.Provider value={{connectedPublicKey:[publicKey, setPublicKey] }}>
            {children}
        </StateContext.Provider>
  )
}

export default StateProvider