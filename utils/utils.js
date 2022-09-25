import {getMetadriveFileContract} from './connectContract';
import {ethers} from 'ethers';
import {useAccount} from 'wagmi';

export const getPublicKey = async (address) => {
    const metadriveFileContract = getMetadriveFileContract();
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
    const metadriveFileContract = getMetadriveFileContract();
    const files = await metadriveFileContract.getFileKeys(address);
    console.log("files",files)
    return files;
  }