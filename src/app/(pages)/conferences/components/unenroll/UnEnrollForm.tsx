"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { Conference } from "@/app/lib/conferences/get.my.conferences"
import { unEnrollToConference } from "@/app/lib/conferences/un.enroll.to.conference"
import React from "react"

export const UnEnrollForm = ({
    id,
    roles,
}: Pick<Conference, "roles" | "id">) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (data) => {
                unEnrollToConference({ id, data })
                    .then(() => {
                        showToast.success("Desinscripto con exito")
                        window.location.reload()
                    })
                    .catch((error) => showToast.error(error.message))
            }}
        >
            {roles?.map((item) => (
                <label key={item} className="inline left">
                    <input type="checkbox" name="roles" value={item} />
                    {item}
                </label>
            ))}
            <SubmitButton className="red">Desinscribirme</SubmitButton>
        </form>
    )
}
