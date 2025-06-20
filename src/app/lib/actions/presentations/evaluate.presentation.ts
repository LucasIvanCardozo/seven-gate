"use server"
import { z } from "zod"
import createAction from "../createActions"
import { State } from "@prisma/client"
import { DB } from "../../db/db"
import { sendEmail } from "../../resend/resend"

const { object, string, number, nativeEnum } = z
const schema = object({
    id: number().positive(),
    state: nativeEnum(State),
    comments: string().min(1).nullable(),
}).refine(({ state, comments }) => {
    if (state === "approved" && comments) return false

    if (state === "approved_with_comments" && !comments) return false

    return true
})

export const evaluatePresentation = createAction(
    schema,
    async ({ id, state, comments }) => {
        const {
            profile_presentations_presenter_profile_idToprofile: profile,
            axis,
        } = await DB.presentations.update({
            where: { id },
            data: {
                state,
                comments,
            },
            include: {
                profile_presentations_presenter_profile_idToprofile: {
                    include: {
                        users: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                axis: {
                    select: {
                        title: true,
                    },
                },
            },
        })

        const {
            users: { id: userId, email, name },
        } = profile

        // await sendEmail({
        //     to: email,
        //     subject: "Tu presentación ha sido evaluada",
        //     html: `<p>
        //                 El evaluador del eje "${axis.title}" ha evaluado tu ponencia y ha cambiado su estado a <b>${await parseState(state)}</b>
        //             </p>
        //             ${comments ? `<p><b>Comentarios: </b>${comments}</p>` : ""}
        //     `,
        // })
    },
)

export const parseState = async (state: State) => {
    const map: Record<State, string> = {
        approved: "Aprobada",
        approved_with_comments: "Aprobada con comentarios",
        rejected: "Rechazada",
        pending: "Pendiente",
        re_sent: "Reenviada",
    }

    return map[state] || "Desconocida"
}
