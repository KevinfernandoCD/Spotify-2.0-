import React from 'react';
import {HomeIcon,SearchIcon,LibraryIcon, HeartIcon, PlusCircleIcon, RssIcon} from '@heroicons/react/outline'
import {signOut, useSession} from 'next-auth/react';
import {useState,useEffect} from 'react';
import useSpotify from '../hooks/useSpotify';
import { useMusicContex } from './context/context';


const SideBar = () => {

const [playlist,setPlaylist] = useState([]);
const {data:session,status} =  useSession();
const spotifyApi  = useSpotify();

const {playlistIdState,setPlaylistIdState} = useMusicContex();

useEffect(() => {

  if(spotifyApi.getAccessToken()){
     
    spotifyApi.getUserPlaylists().then((data) => {

      setPlaylist(data.body.items);

    });

  }

},[session,spotifyApi]);

console.log(playlist)

    return ( 
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen min-w-60 sm:text-1xl sm:max-w-[12rem] hidden md:inline-flex '>
            <div className='space-y-3 '>
                <button onClick={() => signOut()} className='flex  items-center space-x-2 hover:text-white '>
                 
                    <p>Log Out</p>
                </button>
                <button className='flex  items-center space-x-2 hover:text-white '>
                    <HomeIcon className='h-5 w-5'/>
                    <p>Home</p>
                </button>
                  <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5'/>
                    <p>Search</p>
                </button>
                  <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5'/>
                    <p>Your Library</p>
                </button>
             <hr className='border-t-[0.1px] border-gray-900'/>
              <button className='flex  items-center space-x-2 hover:text-white '>
                    <PlusCircleIcon className='h-5 w-5'/>
                    <p>Create Playlist</p>
                </button>
                  <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5'/>
                    <p>Liked Songs</p>
                </button>
                  <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5'/>
                    <p>Your Episodes</p>
                </button>
             <hr className='border-t-[0.1px] border-gray-900'/>
           
           {playlist.map(p => (
                   <p key={p.id} onClick={() => setPlaylistIdState(p.id)} className='cursor-pointer hover:text-white'>{p.name}</p>
           )
           )}
            </div>
        </div>
     );
}
 
export default SideBar;