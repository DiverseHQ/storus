import React, { useEffect, useState, useContext } from 'react'
import { Web3Storage } from "web3.storage";
import {useAccount} from "wagmi"
import { encrypt } from "@metadrive/lib";
import connectContract from '../utils/connectContract';
import * as sigUtil from "@metamask/eth-sig-util";
import {StateContext} from "../utils/StateContext"


const web3StorageClient = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
  endpoint: new URL("https://api.web3.storage"),
});

const UploadFile = () => {
  const [files, setFiles] = useState(null)
  const {address} = useAccount();
  const {connectedPublicKey} = useContext(StateContext)
  const [ publicKey, setPublicKey] = connectedPublicKey

    
  const handleSubmit = async () =>{
    console.log("oh I'm being clicked")
    if(!files){
      console.log("Add File to Upload");
      return
    }
   //Encrypt the File and put them into web3.storage
   const fileBuffer = await files.arrayBuffer();
      const { buffer: encryptedFileBuffer, mnemonic } = await encrypt(
        new Uint8Array(fileBuffer)
      );
      const cid = await web3StorageClient.put(
        [new File([encryptedFileBuffer], files.name.replace(/\s/g, "_"),{type: files.type})],
        {
          wrapWithDirectory: false,
        }
      );

      const encryptedSymmetricKey = Buffer.from(
        JSON.stringify(
          sigUtil.encrypt({
            publicKey: publicKey.toString("base64"),
            data: mnemonic,
            version: "x25519-xsalsa20-poly1305",
          })
        )
      ).toString("hex");

    console.log("encrypted Symmetric Key", encryptedSymmetricKey)

    //Send the encrypted Symmetric Key to the contract
    const contract = connectContract();
    const tx = await contract.addFileKeys(address, encryptedSymmetricKey);
    await tx.wait();
    console.log("File Uploaded", cid)

  }
  return (
    <div>
      <input type="file" id="upload-file"  onChange={(e) =>{setFiles(e.target.files[0])}} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  )
}

export default UploadFile