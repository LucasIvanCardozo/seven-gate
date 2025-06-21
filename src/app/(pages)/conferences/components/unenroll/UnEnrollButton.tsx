"use server"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import React from "react"
import { UnEnrollForm } from "./UnEnrollForm"
import { getConference } from "@/app/lib/actions/conferences/get.conference"

export const UnEnrollButton = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { date, title, roles } = data

    if (!roles?.length) return null

    const isAdmin = roles.some((role) => role === "admin")
    if (isAdmin) return null

    const now = DayJs()
    if (now.isAfter(DayJs(date))) return null

    return (
        <Modal opener={<button className="red">Desinscribirme</button>}>
            <Section title="Elige los roles">
                <p style={{ margin: 0 }}>
                    Selecciona los roles en los que deseas desinscribirte:
                </p>
                <UnEnrollForm {...data} />
            </Section>
        </Modal>
    )
}
