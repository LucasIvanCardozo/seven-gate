import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import {
    CircularDTO,
    getCiruclarsByConference,
} from "@/app/lib/actions/circulars/get.circulars.by.conference"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import { Downloader } from "./Downloader"
import { capitalize } from "@/app/utils/capitalize"

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

const Circular = ({ title, info, created_at, url }: CircularDTO) => (
    <Section
        title={
            <Header>
                <h2>
                    <b>{title}</b>
                </h2>
                <span style={{ opacity: 0.8, fontSize: "1rem" }}>
                    {capitalize(DayJs(created_at).format("LLL"))}
                </span>
            </Header>
        }
    >
        {url ? (
            <Downloader title={`${title}.pdf`} url={url}>
                <span>Descargar circular</span>
            </Downloader>
        ) : (
            <p style={{ whiteSpace: "pre-line" }}>{info}</p>
        )}
    </Section>
)
