"use server"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { AxisAdministrationButton } from "./axisAdministration/AxisAdministrationButton"
import { RoleAdministrationButton } from "./roleAdministration/RoleAdministrationButton"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { CircularAdministrationButton } from "./circularAdministration/CircularAdministrationButton"
import { GenerateQrButton } from "./qrGenerate/generateQrButton"
import { ComunicationAdministrationButton } from "./comunicationAdministration/ComunicationAdministrationButton"
import { SponsorsAdministrationButton } from "./sponsorsAdministration/SponsorsAdministrationButton"
import { CertificatesAdministrationButton } from "./certificatesAdministration/CertificatesAdministrationButton"
import { Grid } from "@/app/components/Grid"

export const AdminSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { roles } = data
    if (!roles?.includes("admin")) return null

    return (
        <Section title="Administración">
            <Grid>
                <SponsorsAdministrationButton id={id} />
                <ComunicationAdministrationButton id={id} />
                <AxisAdministrationButton id={id} />
                <RoleAdministrationButton id={id} />
                <CircularAdministrationButton id={id} />
                <CertificatesAdministrationButton id={id} />
                <GenerateQrButton id={id} />
            </Grid>
        </Section>
    )
}
