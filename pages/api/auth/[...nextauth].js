import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"


const refreshAccessToken = async(token) =>  {

  try {

    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const {body: refreshedToken}  = await spotifyApi.refreshAccessToken();

    console.log(`Refreshed Token : ${refreshedToken}`);

    return {

      ...token,
      accessToken:refreshedToken.access_token,
      accessTokenExpires:Date.now() + refreshedToken.expires_in * 1000,

      refreshToken:refreshedToken.refresh_token?? token.refreshToken,

    }
    
  } catch (error) {

    console.log(error);

    return {

      ...token,
      error:"RefreshAccessTokenError"
      
    }
    
  }

}

export default NextAuth({
  // Configure one or more authentication providers

  providers: [

    SpotifyProvider({

      clientId: process.env.NEXT_AUTH_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH_CLIENT_SECRET,
      authorization:LOGIN_URL,

    }),


    // ...add more providers here

  ],
  
  secret:process.env.JWT_SECRET,

  pages:{

    signIn:'/login'

  },

  callbacks:{

    //JWT BUILT IN METHOD TO CHECK AUTHENTICATION

    async jwt({token,account,user}){

      if(account && user){

        return {

          ...token,
          accessToken:account.access_token,
          refreshToken:account.refresh_token,
          username:account.providerAccountId,
          accessTokenExpires:account.expires_in * 1000,

        }

      }

      if(Date.now() < token.accessTokenExpires) {

        console.log("Access Token is Valid");
        return token;
      }

        console.log("Token Has Expired");
        return await refreshAccessToken(token);
    },

    async session({session,token}) {

      session.user.accessToken = token.accessToken;
      session.user.refreshToken =  token.refreshToken;
      session.user.username = token.username

      return session;

    }

  }

})