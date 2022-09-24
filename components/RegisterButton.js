import React from 'react'
import { MetaMaskInpageProvider } from "@metamask/providers";
import {useAccount} from "wagmi"
import connectContract from '../utils/connectContract';
const RegisterButton = () => {
    const { address, isConnected } = useAccount()
    const [loading, setLoading] = React.useState(false);
    const handleRegister = async () => {
        if (!(window.ethereum && isConnected)) {
            return;
          }
          try{
            setLoading(true)
            console.log(address)
            const ethereum = window.ethereum 
            const pkBase64 = await ethereum.request({
                method: "eth_getEncryptionPublicKey",
                params: [address],
              });
            const pk = Buffer.from(pkBase64, "base64")
              const contract = connectContract();
                const tx = await contract.register(pk);
                await tx.wait()
                setLoading(false)
                console.log(tx);
          }
          catch(error){
            console.log(error)
          }
      
    }
  return (
    <div>
        <h1>You're Required to register</h1>
        <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default RegisterButton