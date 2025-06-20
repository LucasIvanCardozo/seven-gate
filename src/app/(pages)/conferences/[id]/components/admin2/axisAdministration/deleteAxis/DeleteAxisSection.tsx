"use server"

import { Section } from "@/app/components/Section"
import { DeleteAxisForm } from "./DeleteAxisForm"
import { getAxisByConference } from "@/app/lib/actions/axis/get.axis.by.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"

export const DeleteAxisSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getAxisByConference({ id })
    if (!data) return null

    const axis = data.hasEvaluators.concat(data.noEvaluators)
    return (
        <Section title="Eliminar eje">
            <DeleteAxisForm axis={axis} />
        </Section>
    )
}
