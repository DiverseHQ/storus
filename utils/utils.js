import {getMetadriveFileContract} from './connectContract';
import {ethers} from 'ethers';
import {useAccount} from 'wagmi';

export const getPublicKey = async (address) => {
    const metadriveFileContract = getMetadriveFileContract();
    const publicKey = await metadriveFileContract.publicKeys(address);
    if (publicKey === ethers.constants.HashZero) {
      return null;
    } else {
      return hexStringToBuffer(publicKey);
    }
  };