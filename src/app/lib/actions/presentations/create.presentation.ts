"use server"

import { z } from "zod"
import createAction from "../createActions"
import { uploadFile } from "../../cloudinary/cloudinary"
import { DB } from "../../db/db"
import { getServerUser } from "../users"

const { object, number, instanceof: iof } = z

const fileSchema = iof(File)
    .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "El archivo debe pesar menos de 5MB",
    )
    .refine(
        (file) => ["application/pdf"].includes(file.type),
        "Solo se permiten archivos PDF",
    )

const schema = object({
    conference_id: number().positive(),
    axis_id: number().positive(),
    file: fileSchema,
})

export const createPresentation = createAction(
    schema,
    async ({ file, conference_id, axis_id }) => {
        const { user } = await getServerUser()
        if (!user) throw new Error("Necesitas estar logueado")

        const profile = await DB.profile.findFirst({
            where: {
                user_id: +user.id,
                conference_id,
            },
        })

        if (!profile) throw new Error("No estas inscripto en la conferencia")

        const presenter_profile_id = profile.id

        const { url } = await uploadFile(file, {
            folder: "presentations",
            public_id: `profileId_${presenter_profile_id}_axisId_${axis_id}`,
        })

        const { id } = await DB.presentations.create({
            data: {
                presenter_profile_id,
                axis_id,
                url,
            },
        })

        return { id }
    },
)
