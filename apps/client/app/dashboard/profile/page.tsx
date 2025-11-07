import { getProfile } from '@/lib/actions'
import { getSession, Role } from '@/lib/session';


const ProfilePage = async () => {

    const profile = await getProfile();

    const session = await getSession();

    console.log(`Profile:${profile} , session : AccessToken:${session?.accessToken} , RefreshToken:${session?.refreshToken}`);

    if (session?.user?.role !== Role.ADMIN) {
        return <div>You do not have access to view this page.</div>;
    }

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Profile Page</h1>

            <p>{JSON.stringify(profile)}</p>

        </div>
    )
}

export default ProfilePage