"use server"

import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { NewAxisForm } from "./NewAxisForm"

export const NewAxisSection = async ({ id }: Pick<Conference, "id">) => {
    return (
        <Section title="Agregar eje">
            <NewAxisForm id={id} />
        </Section>
    )
}
