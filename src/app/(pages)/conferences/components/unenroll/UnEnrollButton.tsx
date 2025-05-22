import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import React from "react"
import { UnEnrollForm } from "./UnEnrollForm"

export const UnEnrollButton = (props: Conference) => {
    const { date, title, roles } = props

    if (!roles?.length) return null

    const now = DayJs()
    if (now.isAfter(DayJs(date))) return null

    const isAdmin = roles.some((role) => role === "admin")
    if (isAdmin) return null

    return (
        <Modal opener={<button className="red">Desinscribirme</button>}>
            <Section
                title={`¿Está seguro que desea desinscribirse de ${title}?`}
            >
                <UnEnrollForm {...props} />
            </Section>
        </Modal>
    )
}
