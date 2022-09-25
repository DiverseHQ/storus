import React from 'react'
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai'
import NewOptions from './NewOptions'
import UploadFilesModal from './UploadFilesModal'
import { modalType, usePopUpModal } from './wrapper/CustomPopUpProvider'

const NewButton = () => {
    const { showModal } = usePopUpModal()

    // const showNewOptions = (e) => {
    //     showModal({
    //         component: <NewOptions />,
    //         type: modalType.customposition,
    //         onAction: () => {},
    //         extraaInfo: {
    //           top: e.currentTarget.getBoundingClientRect().top + 5 + 'px',
    //           left: e.currentTarget.getBoundingClientRect().right + 20 +  'px'
    //         }
    //       })
    // }
    const onChangeFiles = (e) => {
      const files = e.target.files
      console.log(files)
      showModal({
        component: <UploadFilesModal initialFiles={files} />,
        type: modalType.fullscreen,
        onAction: () => {},
        extraaInfo: {},
        dontHide: true
      })
    }
    return (
      <>
    <label htmlFor='upload-files' className='w-fit flex flex-row justify-center items-center bg-s-bg p-2 px-4 ml-4 mb-4 shadow-md rounded-full text-xl'>
        <AiOutlineUpload className='w-6 h-6 mr-1'/>
        <div>Upload</div>
    </label>
        <input type='file' id="upload-files" hidden multiple onChange={onChangeFiles}/>
        </>
  )
}

export default NewButton