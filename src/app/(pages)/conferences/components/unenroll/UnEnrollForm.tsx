"use client"

import {
    Admin,
    Evaluator,
    Speaker,
    Listener,
} from "@/app/assets/icons/react-icons"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import {
    Conference,
    Role,
} from "@/app/lib/actions/conferences/get.my.conferences"
import { unEnrollToConference } from "@/app/lib/actions/conferences/un.enroll.to.conference"
import React, { ReactNode } from "react"
import Styles from "./UnEnrollForm.module.css"
import { RoleWithIcon } from "../RoleWithIcon"

export const UnEnrollForm = ({
    id,
    roles,
}: Pick<Conference, "roles" | "id">) => {
    const { showToast } = useUI()

    return (
        <form
            className={Styles.form}
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
                <label key={item} style={{ gap: 0 }} className="inline left">
                    <input type="checkbox" name="roles" value={item} />
                    <RoleWithIcon role={item} />
                </label>
            ))}
            <SubmitButton className="red">Desinscribirme</SubmitButton>
        </form>
    )
}

const RoleIcon: Record<Role, ReactNode> = {
    admin: <Admin />,
    evaluador: <Evaluator />,
    ponente: <Speaker />,
    oyente: <Listener />,
}
