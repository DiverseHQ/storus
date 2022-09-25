import React, { useCallback, useEffect, useState, useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { Web3Storage } from 'web3.storage';
import { usePopUpModal } from './wrapper/CustomPopUpProvider'
import {StateContext} from "../utils/StateContext"
import connectContract from '../utils/connectContract';
import {useAccount} from 'wagmi'
import { encrypt } from "@metadrive/lib";
import * as sigUtil from "@metamask/eth-sig-util";

const web3StorageClient = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
    endpoint: new URL("https://api.web3.storage"),
  });

const UploadFilesModal = ({initialFiles}) => {
    const [status,setStatus] = useState('ready');
    const { hideModal } = usePopUpModal()
    const [files, setFiles] = useState(initialFiles)
    const [totalFilesSize, setTotalFilesSize] = useState()
    const [uploadedFilesSize, setUploadedFilesSize] = useState(0)
    const { publicKey, setPublicKey} = useContext(StateContext)
    const {address} = useAccount();

    useEffect(() => {
        console.log("publicKey",publicKey)
    }, [publicKey])

    const convertSize = (size) => {
        if(size < 1024) return size + ' B'
        else if(size < 1024*1024) return (size/1024).toFixed(2) + ' KB'
        else if(size < 1024*1024*1024) return (size/(1024*1024)).toFixed(2) + ' MB'
        else return (size/(1024*1024*1024)).toFixed(2) + ' GB'
    }

    const getFilesSize = useCallback((files) => {
        return convertSize(Array.from(files).map(f => f.size).reduce((a, b) => a + b, 0))
    },[])
    useEffect(() => {
        setTotalFilesSize(getFilesSize(files))
    },[files,getFilesSize])

    const handleUpload = async () => {
        setStatus('uploading')

        const onRootCidReady = cid => {
            console.log('uploading files with cid:', cid)
        }
        
         // when each chunk is stored, update the percentage complete and display
        const totalSize = Array.from(files).map(f => f.size).reduce((a, b) => a + b, 0)
        let uploaded = 0

        const onStoredChunk = size => {
            uploaded += size

            const pct = 100 * (uploaded / totalSize)
            console.log(`Uploading... ${pct.toFixed(2)}% complete`)
            console.log('uploaded', uploaded, 'of', totalSize, 'bytes')
            console.log(`Uploading... ${uploaded} / ${totalFilesSize}`)

            setUploadedFilesSize(convertSize(uploaded))
        }
        if(!files){
            console.log("Add File to Upload");
            return
          }
        const fileBuffer = await files[0].arrayBuffer();
        const { buffer: encryptedFileBuffer, mnemonic } = await encrypt(
            new Uint8Array(fileBuffer)
        );

        const cid = await web3StorageClient.put(
            [new File([encryptedFileBuffer], files[0].name.replace(/\s/g, "_"),{type: files[0].type})],
            {
            wrapWithDirectory: false,
            onRootCidReady, 
            onStoredChunk
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

    setStatus('uploaded')
    }
   
  return (
    <div className='w-96 bg-s-bg p-4 rounded-xl'>
        <div className='flex flex-row mb-4 bold font-bold justify-between w-full items-center'>
            <div>
                {status === 'ready' && `Upload Files (${totalFilesSize})`}
                {status === 'uploading' && `Uploading Files (${uploadedFilesSize}/${totalFilesSize})`}
                {status === 'uploaded' && `Uploaded Files (${totalFilesSize})`}
            </div>
            <AiOutlineClose className='w-6 h-6 cursor-pointer' onClick={hideModal}/>
        </div>
        <div className='flex flex-col mb-1'>
            {files && Array.from(files).map((file,index) => {
                return (
                    <div key={index} className='bg-h-bg my-1 p-1 rounded-md flex flex-row justify-between items-center'>
                        <div>{file.name + '  (' + convertSize(file.size) + ')'}</div>
                        <AiOutlineClose className='w-4 h-4 cursor-pointer' onClick={() => {
                            const newFiles = Array.from(files)
                            newFiles.splice(index,1)
                            setFiles(newFiles)
                        }}/>

                    </div>
                )
            })}
        </div>
        <div className='flex  w-full'>
            <button onClick={handleUpload} disabled={status !== 'ready'} className='bg-p-btn p-1 rounded-md hover:bg-p-btn-hover'>
                {status === 'ready' && 'Upload'}
                {status === 'uploading' && 'Uploading'}
                {status === 'uploaded' && 'Uploaded'}
            </button>
        </div>
    </div>
  )
}

export default UploadFilesModal