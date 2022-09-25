import React from 'react'
import { AiOutlineFileAdd, AiOutlineFolderAdd } from 'react-icons/ai'

const NewOptions = () => {
    const handleFileUploadClick = () => {
        console.log('handleFileUploadClick')
    }
    const handleFolderUploadClick = () => {
        console.log('handleFolderUploadClick')
    }

  return (
    <div className='flex flex-col py-2 bg-s-bg rounded-md shadow-xl w-52'>
        <button className='p-2 my-1 flex flex-row items-center hover:bg-h-bg' onClick={handleFileUploadClick}>
            <AiOutlineFileAdd className='w-5 h-5 mx-2'/>
            <div>Upload File</div>
        </button>
        <button className='p-2 my-1 flex flex-row items-center hover:bg-h-bg' onClick={handleFolderUploadClick}>
            <AiOutlineFolderAdd className='w-5 h-5 mx-2'/>
            <div>Upload Folder</div>
        </button>
      </div>
  )
}

export default NewOptions