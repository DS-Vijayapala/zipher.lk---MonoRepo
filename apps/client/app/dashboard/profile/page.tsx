import { getProfile } from '@/lib/actions'
import { getSession } from '@/lib/session';
import React from 'react'

const ProfilePage = async () => {

    const profile = await getProfile()

    const session = await getSession();

    console.log(`Profile:${profile} , session : AccessToken:${session?.accessToken} , RefreshToken:${session?.refreshToken}`);


    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Profile Page</h1>

            <p>{JSON.stringify(profile)}</p>

        </div>
    )
}

export default ProfilePage