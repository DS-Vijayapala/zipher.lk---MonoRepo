import { getProfile } from '@/lib/actions'
import React from 'react'

const ProfilePage = async () => {

    const profile = await getProfile()

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Profile Page</h1>

            <p>{JSON.stringify(profile)}</p>

        </div>
    )
}

export default ProfilePage