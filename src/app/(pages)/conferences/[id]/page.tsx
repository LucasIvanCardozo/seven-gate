import React from "react"
import { EnrollButton } from "../components/enroll/EnrollButton"
import { getConference } from "@/app/lib/conferences/get.conference"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params

    const conference = await getConference(id)
    if (!conference) redirect("/conferences")

    return (
        <div>
            {id}
            <EnrollButton {...conference} />
        </div>
    )
}
