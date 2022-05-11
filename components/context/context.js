import React, { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';


const MusicContext = createContext();


const MusicContextProvider = ({children}) => {

    const [playlistIdState,setPlaylistIdState] = useState('37i9dQZF1DX0hAXqBDwvwI');
    const [playlistItems,setPlaylistItems] = useState([]);
    const [songIdState,setSongIdState] = useState();
    const [playState,setPlayState] = useState(false);


    return ( <MusicContext.Provider value={{playlistIdState,setPlaylistIdState,playlistItems,setPlaylistItems,songIdState,setSongIdState,playState,setPlayState}}>
        {children}
    </MusicContext.Provider> );
}
 
export default MusicContextProvider;

export const useMusicContex = () => {

    return useContext(MusicContext)
}