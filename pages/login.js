import React from 'react';
import {getProviders,signIn} from 'next-auth/react';


const Login = ({providers}) => {

    console.log(providers)
    return ( <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>

        <img className='w-52 mb-5' src='https://i.pinimg.com/originals/93/46/53/934653214719cf630e0f5cf9c746b364.png' alt="logo"/>

        

        {Object.values(providers).map((provider) => {
            return <div key={provider.name}>
                <button onClick={() => signIn(provider.id,{callbackUrl:"/"})} className='bg-[#18D860] p-2 rounded-md'>Login with {provider.name}</button>
            </div>
        })}
    </div>
         );
}
 
export default Login;

export async function getServerSideProps() {

    const providers = await getProviders();

    return {

        props:{

            providers,
        }
    }

}