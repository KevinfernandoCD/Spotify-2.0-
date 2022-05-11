import {useSession } from 'next-auth/react';
import React from 'react';
import {ChevronDownIcon} from '@heroicons/react/outline';
import {useState,useEffect} from 'react';
import { useMusicContex } from './context/context';
import useSpotify from '../hooks/useSpotify';
import Tracks from '../components/Tracks';

const colors = [

    "from-indogo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    'from-purple-500',
];

const Center = ({providers}) => { 

    const {playlistIdState,playlistItems,setPlaylistItems} = useMusicContex();

    const [color,setColor] = useState();

    const spotifyApi = useSpotify();

    useEffect(() => {

        const RandomIndex = Math.floor(Math.random()*7)

        setColor(colors[RandomIndex]);

    },[playlistIdState]);

    useEffect(() =>{

        spotifyApi.getPlaylist(playlistIdState).then((data) =>{

            setPlaylistItems(data.body);

        })


    },[playlistIdState,spotifyApi])

    const {data:session} = useSession();

    console.log(playlistItems)


    return ( 
    
    <div className=' flex-grow text-white h-screen overflow-y-scroll scrollbar-hide'>
        <header className="absolute top-5 right-8">
            <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-70 cursor-pointer rounded-full p-1 pr-2'>
            <img className='rounded-full w-10 h-10' src={session?.user?.image} alt='user-img'/>
            <h2 className='font-medium'>{session?.user?.name}</h2>
            <ChevronDownIcon className='h-5 2-5'/>
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} p-8 h-80 text-white `}>
            <img className='h-44 w-44 shadow-2xl' src={playlistItems?.images?.[0]?.url} alt='playilist-icon'/> 
            <div>
                <p>PLAYLIST</p>
                <h1 className='font-bold text-2xl md:text-3xl xl:text-5xl'>{playlistItems?.name}</h1>
            </div>
        </section>

        <div>
            <Tracks/>
        </div>
    </div>

    );
}
 
export default Center;