"use client"
import { SessionProvider } from "next-auth/react"
import { UIProvider } from "./UIContext"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <UIProvider>{children}</UIProvider>
        </SessionProvider>
    )
}
