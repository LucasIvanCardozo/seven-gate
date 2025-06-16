"use server"
import { Section } from "@/app/components/Section"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"

export const Stats = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    return <Section title="Stats"></Section>
}
