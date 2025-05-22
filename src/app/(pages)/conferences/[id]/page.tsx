import React from "react"
import { EnrollButton } from "../components/enroll/EnrollButton"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { redirect } from "next/navigation"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const response = await getConference({ id: +id })
    if (!response.success)
        return redirect("/conferences")
    
    const conference = response.data
    if (!conference)
        return redirect("/conferences")

    return (
        <div>
            {id}
            <EnrollButton {...conference} />
        </div>
    )
}
