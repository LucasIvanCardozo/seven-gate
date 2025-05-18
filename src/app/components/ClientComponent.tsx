"use client"

import { useUser } from "../hooks/useUser"
import { GetMyConferences } from "../lib/conferences/get.my.conferences"

export default function ClientComponent({
    children,
}: {
    children: React.ReactNode
}) {
    const { user } = useUser()
    if (!user) return null

    return
}
