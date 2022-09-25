import{ethers} from "ethers"
import abiJSON from "./Storeus.json";

const connectContract = async () => {
    const contractAddress = "0xb72F17860fbE8c4BC8cb9Ab0925BA8ba65df69ec";
    const contractABI = abiJSON;
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

export default connectContract;