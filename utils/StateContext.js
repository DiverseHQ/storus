import React, {useState, useEffect, createContext, useContext} from 'react';
import {useAccount} from 'wagmi';
import connectContract from './connectContract';

export const StateContext = createContext([]);

const StateProvider = ({children}) => {
    const[publicKey,setPublicKey] = useState(null);
    const {address} = useAccount();
    async function getPublicKey() {
      const contract = connectContract();
      const publicKey = await contract.publicKey(address);
      if(publicKey){
        console.log("public key",publicKey)
        setPublicKey(publicKey)
      }
      console.log(publicKey, "public Key pancho")
      }

      useEffect(() =>{
          if(address){
            getPublicKey()
          }
      },[address])

  return ( 
        <StateContext.Provider value={{publicKey, setPublicKey }}>
            {children}
        </StateContext.Provider>
  )
}

export default StateProvider