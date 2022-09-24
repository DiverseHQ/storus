import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import RegisterButton from '../components/RegisterButton'
import UploadFile from '../components/UploadFile'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const themesArray = ['light', 'dark', 'system']
  let themeIndex = themesArray.indexOf(theme)

  const changeTheme = () => {
    themeIndex = (themeIndex + 1)%3
    setTheme(themesArray[themeIndex])
  }

  return (
    <>
      <Head>
        <title>Storus - Drive meets IPFS</title>
        <meta name="description" content="Storus - Drive meets IPFS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-4xl'>Storus - Drive meets IPFS</h1>
        <ConnectButton/>
      </div>
      <button onClick={changeTheme}>Change Theme : {theme}</button>
      <RegisterButton />
      <section>
        <UploadFile />
      </section>
      </>
  )
}
