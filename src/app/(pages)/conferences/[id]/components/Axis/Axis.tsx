"use server"

import { Header } from "@/app/components/Header"
import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import { AddPresentation } from "../speaker/addPresentation/AddPresentation"
import { AxisEditButton } from "./editAxis/editAxisButton"
import { getAxis } from "@/app/lib/actions/axis/get.axis"
import { DeleteAxisButton } from "./deleteAxis/deleteAxisButton"

export const Axis = async ({ id }: Pick<AxisDTO, "id">) => {
    const { data } = await getAxis({ id })
    if (!data) return null

    const { title, organizer } = data

    return (
        <article className="card white">
            <Header>
                <p>{title}</p>
                <div className="flex">
                    <AddPresentation id={id} />
                    <AxisEditButton id={id} />
                    <DeleteAxisButton id={id} />
                </div>
            </Header>
            {organizer && <small>Organizado por: {organizer.users.name}</small>}
        </article>
    )
}
