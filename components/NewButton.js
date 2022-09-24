import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import NewOptions from './NewOptions'
import { modalType, usePopUpModal } from './wrapper/CustomPopUpProvider'

const NewButton = () => {
    const { showModal } = usePopUpModal()

    const showNewOptions = (e) => {
        showModal({
            component: <NewOptions />,
            type: modalType.customposition,
            onAction: () => {},
            extraaInfo: {
              top: e.currentTarget.getBoundingClientRect().top + 5 + 'px',
              left: e.currentTarget.getBoundingClientRect().right + 20 +  'px'
            }
          })
    }
    return (
    <button className='flex flex-row justify-center items-center bg-s-bg p-2 px-4 ml-4 mb-4 shadow-md rounded-full text-xl' onClick={showNewOptions}>
        <AiOutlinePlus className='w-6 h-6 mr-1'/>
        <div>New</div>
    </button>
  )
}

export default NewButton