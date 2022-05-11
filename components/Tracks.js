import React from 'react';
import { useMusicContex } from './context/context';
import Song from './Song';


const Tracks = () => {

    const {playlistItems} = useMusicContex();

    let i = 0;

    return ( <div className='text-white px-8 flex flex-col space-y-1 pb-20 '>

        {playlistItems?.tracks?.items.map((item,i) => ( 

        <Song key={item.track.id} item={item} order={i}/>
        
        ))}
    </div>
    
    );
}
 
export default Tracks;