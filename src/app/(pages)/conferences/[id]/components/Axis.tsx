import { getAxisByConference } from "@/app/lib/actions/axis/get.by.conference"
import Styles from "./Axis.module.css"
import { Header } from "@/app/components/Header"
import { AddPresentation } from "./AddPresentation"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { Section } from "@/app/components/Section"

export const Axis = async (props: Conference) => {
    const { id } = props
    const { data: axis } = await getAxisByConference({ id })

    return (
        <Section title="Ejes" className={Styles.axis}>
            {axis?.length ? (
                axis.map((item) => (
                    <div key={item.id} className="card white">
                        <Header>
                            <p>{item.title}</p>
                            <AddPresentation {...props} axisId={item.id} />
                        </Header>
                        {item.profile && (
                            <small>
                                Organizado por: {item.profile.users.name}
                            </small>
                        )}
                    </div>
                ))
            ) : (
                <p>No hay ejes configurados</p>
            )}
        </Section>
    )
}
