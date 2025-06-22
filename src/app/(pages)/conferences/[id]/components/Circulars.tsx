import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import {
    CircularDTO,
    getCiruclarsByConference,
} from "@/app/lib/actions/circulars/get.circulars.by.conference"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"

export const Circulars = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getCiruclarsByConference({ id })
    if (!data) return null

    return (
        <Section title="Circulares">
            {data.length ? (
                data.map((item) => <Circular key={item.id} {...item} />)
            ) : (
                <p>No hay circulares publicadas.</p>
            )}
        </Section>
    )
}

const Circular = ({ title, info, created_at }: CircularDTO) => (
    <Section
        title={
            <Header>
                <h2><b>{title}</b></h2>
                <span>{DayJs(created_at).format("LLLL")}</span>
            </Header>
        }
    >
        <p>{info}</p>
    </Section>
)
