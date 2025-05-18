"use client"
import { useSession } from "next-auth/react"

export const useUser = () => {
    const { data } = useSession()
    const user = data?.user

    return {
        user,
    }
}
