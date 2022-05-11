import React from 'react';
import useSpotify from '../hooks/useSpotify';
import calDuration from './calDuration';
import { useMusicContex } from './context/context';


const Song = ({item,order}) => {

    const spotifyApi = useSpotify();

    const {setPlayState,playState,songIdState,setSongIdState} = useMusicContex();

    const playSong = () => {

        setSongIdState(item.track.id);

        setPlayState(true);

        spotifyApi.play({

           uri: [item.track.uri],
        
        })
    }

    return ( <div className='grid grid-cols-2 hover:bg-gray-900 cursor-pointer p-5 rounded-md' onClick={playSong}>

       <div className='flex items-center space-x-5 '>
        <p>{order + 1}</p>
       <img className='h-10 w-10' src={item.track.album.images[0].url}/>
       <div>
           <p className='w-36 lg:w-64'>{item.track.name}</p>
           <p className='text-sm text-gray-400'>{item.track.artists[0].name}</p>
       </div>
       </div> 
    <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='text-sm text-gray-400 hidden md:inline'>{item.track.album.name}</p>
        <p className='text-sm text-gray-400'>{calDuration(item.track.duration_ms)}</p>
    </div>
</div> );
}
 
export default Song;