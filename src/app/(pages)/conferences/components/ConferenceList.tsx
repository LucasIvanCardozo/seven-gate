import { Grid } from "@/app/components/Grid"
import { Section } from "@/app/components/Section"
import type { Conference as ConferenceType } from "@/app/lib/actions/conferences/get.my.conferences"
import React, { ComponentProps } from "react"
import { Conference } from "./Conference"

export const ConferenceList = ({
    title,
    conferences,
}: {
    title: ComponentProps<typeof Section>["title"]
    conferences: ConferenceType[]
}) =>
    !!conferences.length && (
        <Section title={title}>
            <Grid>
                {conferences.map((item) => (
                    <Conference key={item.id} {...item} />
                ))}
            </Grid>
        </Section>
    )
