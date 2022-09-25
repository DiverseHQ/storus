import React,{useContext} from 'react'
import { MetaMaskInpageProvider } from "@metamask/providers";
import {useAccount} from "wagmi"
import connectContract from '../utils/connectContract';
import {StateContext} from "../utils/StateContext"

const RegisterButton = () => {
    const { address, isConnected } = useAccount()
    const [loading, setLoading] = React.useState(false);
    const {connectedPublicKey} = useContext(StateContext)
    const [ publicKey, setPublicKey] = connectedPublicKey

    const handleRegister = async () => {
        if (!(window.ethereum && isConnected)) {
            return;
          }
          try{
            setLoading(true)
            console.log(address)
            const ethereum = window.ethereum 
            // create a Public Key for an Ethereum address
            const publicKey = await ethereum.request({
              method: 'eth_getEncryptionPublicKey',
              params: [address],
            });
            console.log(publicKey)
            setPublicKey(publicKey)
            const contract = connectContract();
            const tx = await contract.register(publicKey);
            await tx.wait();
            setLoading(false)
          }
          catch(error){
            console.log(error)
          }
      
    }
  return (
    <div>
      {
        isConnected && (
          <>
          <h1>You're Required to register</h1>
           <button onClick={handleRegister} className="bg-blue ">Register</button>
          </>
        )
      }
        
    </div>
  )
}

export default RegisterButton