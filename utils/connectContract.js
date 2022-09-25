import{ethers} from "ethers"
import abiJSON from "./Storeus.json";

function connectContract(){
    const contractAddress = "0x2c588b52DCA75cc6A22e48401C356C4BAAF6a24a";
    const contractABI = abiJSON.abi;
    let storeusContract;
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        //checking for eth object in the window
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        storeusContract = new ethers.Contract(contractAddress, contractABI, signer); // instantiating new connection to the contract
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
    return storeusContract;
}

export default connectContract