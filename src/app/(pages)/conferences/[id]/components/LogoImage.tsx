"use server"

import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { redirect } from "next/navigation"
import Styles from "./LogoImage.module.css"
import Image from "next/image"

export const LogoImage = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return redirect("/conferences")

    const { logo_url } = data

    return (
        <div className={Styles.container}>
            <Image
                src="/images/redGtec.png"
                height={150}
                width={300}
                alt=""
                className={Styles.image}
            />
        </div>
    )
}
