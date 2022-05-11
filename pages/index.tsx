import type { NextPage } from 'next'
import  Head  from 'next/head'
import SideBar from '../components/SideBar'
import Center  from '../components/Center'
import { getSession } from 'next-auth/react'
import Player  from '../components/Player'

const Home: NextPage = () => {

  return (

    <div className='bg-black h-screen overflow-hidden '>
      <Head>
        <title>Spotify 2.0</title>
      </Head>
    
<main className='flex'>
  <SideBar/>
  <Center/>
</main>

<div className='sticky bottom-0'>
<Player/>
</div> 
  </div>
  )
}

export default Home

export async function getServerSideProps(context) {

  const session = await getSession(context);

  return {
    props: {
       session,
    },
  };
}
