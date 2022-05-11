import React from 'react';
import { useState,useEffect } from 'react';
import useSpotify from './useSpotify';
import { useMusicContex } from '../components/context/context';


const useSongInfo = () => {

    const [SongInfo,setSongInfo] = useState();

    const spotifyApi = useSpotify();
    
    const {songIdState,setSongIdState} = useMusicContex();

    useEffect(() => {

        const fetchSongInfo = async () => {

            if(songIdState){

                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${songIdState}`,

                {
                    headers:{
                        Authorization:`Bearer ${spotifyApi.getAccessToken()}`,

                    },
                }
                
                ).then(res => res.json());

                setSongInfo(trackInfo)
            }
        }

    fetchSongInfo();


    },[songIdState])


    return SongInfo

}
 
export default useSongInfo;