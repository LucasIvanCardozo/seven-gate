"use client"

import { signOut } from "next-auth/react"

export const LogOutButton = () => {
    return <button onClick={() => signOut({ callbackUrl: "/" })}>Cerrar sesión</button>
}
