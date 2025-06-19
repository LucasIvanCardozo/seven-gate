"use server"
import { getServerUser } from "@/app/lib/actions/users"

export default async function Profile() {
    const { user } = await getServerUser()
    if (!user) return null

    return <div>Hola {user.name}!</div>
}
