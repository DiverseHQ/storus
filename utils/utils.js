// import {connectContract} from './connectContract'
import {ethers} from 'ethers';
import {useAccount} from 'wagmi';

export const getPublicKey = async (address) => {
    // const metadriveFileContract = connectContract();
    const publicKey = await metadriveFileContract.publicKeys(address);
    if (publicKey === ethers.constants.HashZero) {
      return null;
    } else {
        console.log("public key",publicKey)
      return hexStringToBuffer(publicKey);
    }
  };

  export const parseFileUrl = (url)=> {
    if (url.startsWith("ipfs://")) {
      return {
        ipfsCid: url.slice(7),
      };
    } else {
      return null;
    }
  };

  export const getFiles = async(address) =>{

    const metadriveFileContract = connectContract();
    const files = await metadriveFileContract.getFileKeys(address);
    console.log("files",files)
    return files;
  }
export const CHANNEL_ADDRESS = "0xB522133dBd9C8B424429D89d821aeb2a115dB678"
