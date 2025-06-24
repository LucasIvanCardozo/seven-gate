"use server"

import { Section } from "@/app/components/Section"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"

export const Survey = async ({ id }: Pick<Conference, "id">) => {
    const { data: conference } = await getConference({ id })
    if (!conference) return null

    const { date, profileId } = conference

    if (!profileId) return null
    if (!DayJs(date).add(1, "day").isBefore(DayJs())) return null

    return (
        <Section title="Encuesta de satisfacción">
            <p className="mb-2">
                Nos encantaría conocer tu opinión sobre el evento. Tu
                participación nos ayuda a seguir mejorando.
            </p>
            <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScLqRAXqnZUjqRE3l3WQdF803CCEeD4rSIISzoFFSZLLzm4OQ/viewform"
                className="button"
                target="_blank"
            >
                Completá la encuesta de satisfacción
            </a>
        </Section>
    )
}
