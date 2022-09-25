
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GrStorage } from 'react-icons/gr'
import {MdOutlineFolderShared} from 'react-icons/md'
import Nav from '../components/Nav'
import NewButton from '../components/NewButton'
import MasterWrapper from '../components/wrapper/MasterWrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  //check if mounter
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if(!mounted) return null

  console.log(router.pathname)
  const changeToHome = () => {
    router.push('/')
  }

  const changeToSharedPage = () => {
    router.push('/shared')
  }

  return <MasterWrapper> 
    <div className="bg-p-bg w-full h-screen text-p-text">
    <Head>
        <title>Storus - Drive meets IPFS</title>
        <meta name="description" content="Storus - Drive meets IPFS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Nav />
      <div className='w-full flex'>
        <div className='w-[200px] h-full mt-8 mr-8'>

         <NewButton />

          <div className={`p-2 rounded-r-full w-full my-1 hover:bg-h-bg flex flex-row items-center cursor-pointer ${router.pathname === '/' && 'bg-s-bg'}`} onClick={changeToHome}>
            <GrStorage className='w-5 h-5 mx-2'/> 
            <div>My Storus</div>
          </div>
          <div className={`p-2 rounded-r-full w-full my-1 hover:bg-h-bg flex flex-row items-center cursor-pointer ${router.pathname === '/shared' && 'bg-s-bg'}`}  onClick={changeToSharedPage}>
            <MdOutlineFolderShared className='w-5 h-5 mx-2'/> 
            <div>Shared</div>
          </div>
          
        </div>
        <div className='flex-1'>
          <Component {...pageProps} />
        </div>
      </div> 
    </div> 
    </MasterWrapper>
}

export default MyApp
