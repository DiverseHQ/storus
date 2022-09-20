import MasterWrapper from '../components/wrapper/MasterWrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <MasterWrapper> <div style={{padding: "20px"}} className="bg-p-bg text-p-text"> <Component {...pageProps} /> </div> </MasterWrapper>
}

export default MyApp
