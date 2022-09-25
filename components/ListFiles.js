import React, { useEffect, useState } from 'react'
import { decrypt } from "@metadrive/lib";
import { useAccount, useSigner } from "wagmi";
import * as bip39 from "bip39";
import { getFiles } from '../utils/utils';
import { ethers } from 'ethers';
import contractABI from '../utils/Storeus.json'

const ListFiles = () => {
    const { address, isConnected } = useAccount();
    const { data: signer, isError, isLoading } = useSigner()
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if(address) fetchFiles()
      }, [address]);
    
      const fetchFiles = async () => {
        if (!isConnected) {
          return;
        }
        try {
          const storusContract = new ethers.Contract("0xb72F17860fbE8c4BC8cb9Ab0925BA8ba65df69ec", contractABI, signer);
          const files = await storusContract.getFileKeys(address);
          console.log( "files",files)
          // const fileInfos = await getFiles(address);
          // console.log("flieInfos",fileInfos)
          // setFiles(fileInfos)
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
            {files}
    </div>
  )
}

export default ListFiles