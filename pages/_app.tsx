import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import MusicContextProvider from '../components/context/context'


function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  
  return <SessionProvider session={session}>
    <MusicContextProvider>
   <Component {...pageProps} />
   </MusicContextProvider>
   </SessionProvider>
}

export default MyApp
