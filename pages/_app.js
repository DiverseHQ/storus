import { useEffect, useState } from 'react'
import MasterWrapper from '../components/wrapper/MasterWrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <MasterWrapper> <div className="bg-p-bg w-full h-screen p-5 text-p-text"> <Component {...pageProps} /> </div> </MasterWrapper>
}

export default MyApp
