"use server"

import { Header } from "@/app/components/Header"
import { AxisDTO } from "@/app/lib/actions/axis/get.by.conference"
import { AddPresentation } from "../speaker/addPresentation/AddPresentation"
import { DeleteAxisButton } from "./deleteAxis/deleteAxisButton"
import { AxisEditButton } from "./editAxis/editAxisButton"
import { getAxis } from "@/app/lib/actions/axis/get.axis"

export const Axis = async (props: Pick<AxisDTO, "id">) => {
    const { data } = await getAxis(props)
    if (!data) return null

    const { title, organizer } = data

    return (
        <article className="card white">
            <Header>
                <p>{title}</p>
                <div className="flex">
                    <AddPresentation {...props} />
                    <AxisEditButton {...props} />
                    <DeleteAxisButton {...props} />
                </div>
            </Header>
            {organizer && <small>Organizado por: {organizer.users.name}</small>}
        </article>
    )
}
