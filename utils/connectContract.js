import{ethers} from "ethers"
import abiJSON from "./Storeus.json";

function connectContract(){
    const contractAddress = "0x7B5730a106Bc23D06050425411341C05fb8ac79b";
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