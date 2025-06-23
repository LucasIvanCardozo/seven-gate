"use server"
import { getServerUser } from "@/app/lib/actions/users"
import { LogOutButton } from "./components/LogOutButton"

export default async function Profile() {
    const { user } = await getServerUser()
    if (!user) return null

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Hola {user.name}!</h1>
            <LogOutButton />
        </main>
    )
}
