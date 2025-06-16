"use server"
import {
    AxisDTO,
    getAxisByConference,
} from "@/app/lib/actions/axis/get.by.conference"
import Styles from "./Axis.module.css"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { Section } from "@/app/components/Section"
import { Axis } from "./Axis"
import { getProfile } from "@/app/lib/actions/profiles/get.profile"

export const AxisSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getAxisByConference({ id })
    if (!data) return null
    const { hasEvaluators, noEvaluators } = data

    const { data: profile } = await getProfile({ conference_id: id })
    const isAdmin = profile?.roles.includes("admin") ?? false

    if (isAdmin)
        return (
            <Section title="Ejes">
                <Section title="Sin evaluadores" className={Styles.axis}>
                    <AxisList axis={noEvaluators} />
                </Section>
                <Section title="Con evaluadores" className={Styles.axis}>
                    <AxisList axis={hasEvaluators} />
                </Section>
            </Section>
        )

    return (
        <Section title="Ejes" className={Styles.axis}>
            <AxisList axis={hasEvaluators} />
        </Section>
    )
}

const AxisList = ({ axis }: { axis: AxisDTO[] }) =>
    axis?.length ? (
        axis.map((item) => <Axis key={item.id} {...item} />)
    ) : (
        <p>No hay ejes</p>
    )
