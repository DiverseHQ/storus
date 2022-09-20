import { useTheme } from 'next-themes'
import Head from 'next/head'
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
      <h1>Storus - Drive meets IPFS</h1>
      <button onClick={changeTheme}>Change Theme : {theme}</button>
      </>
  )
}
