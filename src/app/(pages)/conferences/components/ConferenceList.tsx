import { Grid } from "@/app/components/Grid"
import { Section } from "@/app/components/Section"
import type { Conference as ConferenceType } from "@/app/lib/actions/conferences/get.my.conferences"
import { ComponentProps } from "react"
import { Conference } from "./Conference"

export const ConferenceList = ({
    title,
    conferences,
}: {
    title: ComponentProps<typeof Section>["title"]
    conferences: ConferenceType[] | null
}) => (
    <Section title={title}>
        {conferences?.length ? (
            <Grid>
                {conferences.map(({ id }) => (
                    <Conference key={id} id={id} />
                ))}
            </Grid>
        ) : (
            <p>No hay conferencias</p>
        )}
    </Section>
)
