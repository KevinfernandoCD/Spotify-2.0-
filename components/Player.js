import { useSession } from 'next-auth/react';
import React, { useEffect,useCallback } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useMusicContex } from './context/context';
import {useState} from 'react'
import useSongInfo from '../hooks/useSongInfo';
import {SwitchHorizontalIcon,RewindIcon,PlayIcon,PauseIcon,ReplyIcon,FastForwardIcon,VolumeUpIcon,VolumeDownIcon} from '@heroicons/react/outline';
import {debounce} from 'lodash';

const Player = () => {

    const [vol,setVol] = useState(50);

    const spotifyApi = useSpotify();

    const {data:session,status} = useSession();

    const {playState,setPlayState,songIdState,setSongIdState} = useMusicContex();

    const TrackInfo  = useSongInfo();

    const fetchCurrentSong = () => {

        if(!songIdState){

            spotifyApi.getMyCurrentPlayingTrack().then((data) =>{

                setSongIdState(data.body?.item.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) =>{

                    setPlayState(data.body?.is_playing);

                })
            })
        }

    }



    useEffect(() =>{


        if(spotifyApi.getAccessToken() && !songIdState){

            fetchCurrentSong();
            setVol(50);
        }


    },[songIdState,spotifyApi,session]);


    const handlePlayPause = () =>{

        spotifyApi.getMyCurrentPlaybackState().then((data) => {

            if(data.body.is_playing){

                setPlayState(false);
                spotifyApi.pause();

            }else{

                spotifyApi.play();
                setPlayState(true)

            }
        })

    }

    const debouncedAdjustVol = useCallback(

        debounce((volume) => {

            spotifyApi.setVolume(volume).catch(err => {})
        },500),[]
    )

    useEffect(() => {

        if(vol > 0 && vol < 100){


            debouncedAdjustVol(vol);
        }


    },[vol])

return (


    <div className='text-white h-24 bg-gradient-to-b from-black to-gray-900 border-t-2 border-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        <div className='flex items-center space-x-4'>
            <img classname='hidden md:inline h-10 w-10' src={TrackInfo?.album.images?.[2].url} alt=""/>
        
        <div>
            <h3>{TrackInfo?.name}</h3>
            <p>{TrackInfo?.artists?.[0]?.name}</p>          
        </div>    
        </div>

        <div className='flex items-center justify-evenly'>
            <SwitchHorizontalIcon className='button'/>
            <RewindIcon className='button'/>

            {playState? (

                <PauseIcon onClick={handlePlayPause}  className='button w-10 h-10'/>

            ):(

                <PlayIcon onClick={handlePlayPause} className='button w-10 h-10'/>
            )
        }

        <FastForwardIcon className='button'/>
        <ReplyIcon className='button'/>
        </div>

    
<div className='flex items-center space-x-3 md:space-x-4 justify-end'>
       <VolumeUpIcon onClick={() => vol > 0? setVol(0):setVol(vol)} className='button'/>
    <input className='w-14 md:w-28 cursor-pointer' type="range" onChange={(e) => setVol(Number(e.target.value))} value={vol} min={0} max={100}/>

</div>

    </div>
)


}

export default Player;