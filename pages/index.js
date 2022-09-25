import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import RegisterButton from '../components/RegisterButton'
import UploadFile from '../components/UploadFile'
import styles from '../styles/Home.module.css'
import {FiSettings} from 'react-icons/fi'
import { modalType, usePopUpModal } from '../components/wrapper/CustomPopUpProvider'
import SettingOption from '../components/SettingOption'


export default function Home() {
  
  return (
    <>
      <Head>
        <title>Storus - Drive meets IPFS</title>
        <meta name="description" content="Storus - Drive meets IPFS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-4xl'>Storus - Drive meets IPFS</h1>
      </div>
      {/* <button onClick={changeTheme}>Change Theme : {theme}</button> */}
      <RegisterButton />
      <UploadFile />
      </>
  )
}
