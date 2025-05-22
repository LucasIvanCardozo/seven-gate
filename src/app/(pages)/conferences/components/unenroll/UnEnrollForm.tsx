"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { unEnrollToConference } from "@/app/lib/actions/conferences/un.enroll.to.conference"
import React from "react"

export const UnEnrollForm = ({
    id,
    roles,
}: Pick<Conference, "roles" | "id">) => {
    const { showToast } = useUI()

    return (
        <form
            action={async (formData) => {
                const response = await unEnrollToConference({
                    id,
                    roles: Array.from(formData.getAll("roles")),
                })

                if (!response.success) showToast.error(response.error)
                else {
                    showToast.success("Desinscripto con éxito")
                    setTimeout(() => window.location.reload(), 1000)
                }
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
