import React, { useEffect, useState } from 'react'
import { decrypt } from "@metadrive/lib";
import { useAccount } from "wagmi";
import * as bip39 from "bip39";
import { getFiles } from '../utils/utils';

const ListFiles = () => {
    const { address, isConnected } = useAccount();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if(address) fetchFiles()
      }, [address]);
    
      const fetchFiles = async () => {
        if (!isConnected) {
          return;
        }
        try {
          const fileInfos = await getFiles(address);
          console.log("flieInfos",fileInfos)
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