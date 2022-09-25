import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import RegisterButton from '../components/RegisterButton'
import UploadFile from '../components/UploadFile'
import styles from '../styles/Home.module.css'
import {FiSettings} from 'react-icons/fi'
import { modalType, usePopUpModal } from '../components/wrapper/CustomPopUpProvider'
import SettingOption from '../components/SettingOption'
import ListFiles from '../components/ListFiles'
import { useContext, useEffect } from 'react'
import {StateContext} from "../utils/StateContext"
import connectContract from '../utils/connectContract';
import {useAccount} from 'wagmi'

export default function Home() {
  const {address} = useAccount();
  const {connectedPublicKey} = useContext(StateContext)
    const [ publicKey, setPublicKey] = connectedPublicKey

  async function getPublicKey() {
    const contract = connectContract();
    const publicKey = await contract.publicKey(address);
    setPublicKey(publicKey)
    console.log(publicKey, "public Key pancho")
    }

    useEffect(() =>{
        {address && getPublicKey()}
    },[address])
  
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
      <ListFiles />
      </>
  )
}
