import SpotifyWebApi from "spotify-web-api-node";

const scope = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read"

].join(',');

//JOINS THE WHOLE ARRAY ASA STRING WHERE THE , INCLUDES

const params = {

    scope:scope,

};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL  = `https://accounts.spotify.com/authorize?${queryParamString}`;


const spotifyApi = new SpotifyWebApi({

    clientId: process.env.NEXT_AUTH_CLIENT_ID,
    clientSecret: process.env.NEXT_AUTH_CLIENT_SECRET,

});

export default spotifyApi;

export {LOGIN_URL};
