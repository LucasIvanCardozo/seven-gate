"use server"
import { Section } from "@/app/components/Section"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import getStats from "@/app/lib/actions/conferences/get.stats"

export const Stats = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getStats({ id })
    if (!data) return null

    const { byRoles, presentations } = data

    return (
        <Section title="Stats">
            {Object.entries(byRoles).map(([role, value]) => (
                <span key={role}>
                    <b>{role}:</b> {value}
                </span>
            ))}

            <span>
                <b>Cantidad de ponencias:</b> {presentations.length}
            </span>
        </Section>
    )
}
