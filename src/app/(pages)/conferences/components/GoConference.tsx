"use client"

import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { useRouter } from "next/navigation"


export const GoConference = ({ id }: Pick<Conference, "id">) => {
    const router = useRouter()

    return (
        <button onClick={() => router.push(`/conferences/${id}`)}>
            Entrar
        </button>
    )
}
