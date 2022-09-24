import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { FiSettings } from 'react-icons/fi'
import SettingOption from './SettingOption'
import { modalType, usePopUpModal } from './wrapper/CustomPopUpProvider'

const Nav = () => {
    const { showModal } = usePopUpModal()
  

    const showSettingsOptions = (e) => {
      if(!showModal) return
      showModal({
        component: <SettingOption />,
        type: modalType.customposition,
        onAction: () => {},
        extraaInfo: {
          top: e.currentTarget.getBoundingClientRect().bottom + 5 + 'px',
          right: window.innerWidth - e.currentTarget.getBoundingClientRect().right +  'px'
        }
      })
    }
  return (
    <div className='flex flex-row justify-between items-center p-5'>
    <h1 className='text-4xl'>Storus - Drive meets IPFS</h1>
    <div className='flex flex-row justify-center items-center gap-4'>
      <FiSettings className='w-5 h-5 cursor-pointer' onClick={showSettingsOptions}/>
      <ConnectButton/>
    </div>
  </div> 
  )
}

export default Nav