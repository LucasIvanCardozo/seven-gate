import { getAxisByConference } from "@/app/lib/actions/axis/get.by.conference"
import Styles from "./Axis.module.css"
import { Header } from "@/app/components/Header"
import { AddPresentation } from "../AddPresentation"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { Section } from "@/app/components/Section"
import { Axis } from "./Axis"

export const AxisSection = async (props: Pick<Conference, "id">) => {
    const { data: axis } = await getAxisByConference(props)

    return (
        <Section title="Ejes" className={Styles.axis}>
            {axis?.length ? (
                axis.map((item) => <Axis key={item.id} {...item} />)
            ) : (
                <p>No hay ejes configurados</p>
            )}
        </Section>
    )
}
