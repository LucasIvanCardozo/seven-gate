"use server"

import { sendEmail } from "../../resend/resend"
import createAction from "../createActions"
import z from "zod"
import { getProfiles } from "../profiles/get.profiles"

const { object, coerce, string } = z

const schema = object({
    conference_id: coerce.number().positive(),
    message: string().min(1),
})

export const send = createAction(schema, async ({ conference_id, message }) => {
    const { data: profiles } = await getProfiles({ conference_id })
    if (!profiles) throw new Error("Error")

    if (!profiles.length) throw new Error("No hay usuarios en el congreso")

    const conference = profiles[0].conferences
    const emails = profiles.map(({ users }) => users.email)

    await sendEmail({
        to: emails,
        subject: `Nuevo mensaje de ${conference.title ?? ""}`,
        html: message,
    })
})
