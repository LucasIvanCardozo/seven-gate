"use server"
import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import { capitalize } from "@/app/utils/capitalize"
import { DayJs } from "@/app/utils/DayJs"
import { EnrollButton } from "../../components/enroll/EnrollButton"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import {
    getConference,
    getConferenceAdmins,
} from "@/app/lib/actions/conferences/get.conference"
import { MarkAssistance } from "./MarkAssistance"

export const Info = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { title, presentation_limit_date } = data

    return (
        <Section
            title={
                <Header>
                    <h2>{title}</h2>
                    <EnrollButton {...data} />
                    <MarkAssistance id={id} />
                </Header>
            }
        >
            <div className="flex">
                <p>Fecha límite de presentación: </p>
                <b>
                    {capitalize(DayJs(presentation_limit_date).format("LLL"))}
                </b>
            </div>

            <Admins id={id} />
        </Section>
    )
}

const Admins = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConferenceAdmins({ id })

    if (!data) return null

    return (
        <div>
            <h3>Administradores: </h3>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.users.name}</li>
                ))}
            </ul>
        </div>
    )
}
