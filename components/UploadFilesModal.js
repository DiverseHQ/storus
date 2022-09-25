import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { Web3Storage } from 'web3.storage';
import { StateContext } from '../utils/StateContext';
import { usePopUpModal } from './wrapper/CustomPopUpProvider'
import * as EpnsAPI from '@epnsproject/sdk-restapi'
import { useAccount, useSigner } from 'wagmi';
import { CHANNEL_ADDRESS } from '../utils/utils';

const UploadFilesModal = ({initialFiles}) => {
    const {data: signer, isError, isLoading} = useSigner()
    const {address} = useAccount()
    const [status,setStatus] = useState('ready');
    const { hideModal } = usePopUpModal()
    const [files, setFiles] = useState(initialFiles)
    const [totalFilesSize, setTotalFilesSize] = useState()
    const [uploadedFilesSize, setUploadedFilesSize] = useState(0)
    const {setFilesToShow} = useContext(StateContext)

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
    
        // makeStorageClient returns an authorized Web3.Storage client instance
        const client = new Web3Storage({token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN})
    
        // client.put will invoke our callbacks during the upload
        // and return the root cid when the upload completes
        const cid = await client.put(files, { onRootCidReady, onStoredChunk })
        console.log('cid',cid)
        const filesToShow = Array.from(files).map(f => ({
            name: f.name,
            size: convertSize(f.size),
            url: URL.createObjectURL(f)
        }))
        setFilesToShow(filesToShow)

        for(const file of Array.from(files)){
            await EpnsAPI.payloads.sendNotification({
                signer,
                type: 1, // broadcast
                identityType: 2, // direct payload
                notification: {
                  title: file.name,
                  body: `Creator: ${address} \n` + 'CID: ' + cid + '\n Size: ' + convertSize(file.size) + `\n Link: https://dweb.link/ipfs/${cid}`,
                },
                payload: {
                  title: file.name,
                  body: `Creator: ${address} \n` + 'CID: ' + cid + '\n Size: ' + convertSize(file.size) + `\n Link: https://dweb.link/ipfs/${cid}`,
                  cta: '',
                  img: URL.createObjectURL(file)
                },
                channel: `eip155:80001:${CHANNEL_ADDRESS}`, // your channel address
                env: 'staging'
              });
        }
        
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