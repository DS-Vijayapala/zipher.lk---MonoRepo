import { Button } from '@/components/ui/button'
import { getSession } from '@/lib/session'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const DashBoard = async () => {

    const session = await getSession()

    if (!session?.user || !session) {
        redirect('/auth/login')
    }

    return (

        <div>
            <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>

            <Link
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                href="/dashboard/profile"
            >
                Profile
            </Link>
        </div>

    )

}

export default DashBoard