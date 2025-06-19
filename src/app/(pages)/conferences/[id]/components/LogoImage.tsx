"use server"

import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { redirect } from "next/navigation"

export const LogoImage = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return redirect("/conferences")

    const { logo_url } = data
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "4rem 0 0 0",
            }}
        >
            <img src={logo_url} />
        </div>
    )
}
