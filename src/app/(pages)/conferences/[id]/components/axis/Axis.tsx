"use server"

import { Header } from "@/app/components/Header"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { AddPresentation } from "../speaker/addPresentation/AddPresentation"
import { AxisEditButton } from "./editAxis/editAxisButton"
import { getAxis } from "@/app/lib/actions/axis/get.axis"
import { DeleteAxisButton } from "./deleteAxis/deleteAxisButton"
import { VotePresentationButton } from "./vote/VotePresentationButton"
import { Votes } from "./vote/Votes"
import Styles from "./Axis.module.css"

export const Axis = async ({ id }: Pick<AxisDTO, "id">) => {
    const { data } = await getAxis({ id })
    if (!data) return null

    const { title, organizer } = data

    return (
        <article className={`${Styles.axis} card white`}>
            <Header style={{ flexWrap: "wrap" }}>
                <h3>
                    <b>{title.toUpperCase()}</b>
                </h3>
                <div className="flex" style={{ flexWrap: "wrap" }}>
                    <VotePresentationButton id={id} />
                    <AddPresentation id={id} />
                    <AxisEditButton id={id} />
                    <DeleteAxisButton id={id} />
                </div>
            </Header>
            <p>Horario: No disponible aún</p>
            <span>Sala: No disponible aún</span>
            <Votes id={id} />
            {organizer && <small>Organizado por: {organizer.users.name}</small>}
        </article>
    )
}
