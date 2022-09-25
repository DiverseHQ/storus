import { ethers } from 'ethers';
import React, {useState, useEffect, createContext, useContext} from 'react';
import {useAccount, useSigner} from 'wagmi';
import contractABI from '../utils/Storeus.json'

export const StateContext = createContext([]);

const StateProvider = ({children}) => {
    const[publicKey,setPublicKey] = useState(null);
    const {address} = useAccount();
    const {data: signer, isError, isLoading} = useSigner();

    async function getPublicKey() {
      const contract = new ethers.Contract("0xb72F17860fbE8c4BC8cb9Ab0925BA8ba65df69ec", contractABI, signer);
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