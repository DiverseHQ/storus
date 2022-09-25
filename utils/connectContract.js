import{ethers} from "ethers"
import abiJSON from "./Storeus.json";

function connectContract(){
    const contractAddress = "0x6B56E82a94276656068771C49141Bf87981D1a0F";
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