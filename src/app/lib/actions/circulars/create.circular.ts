"use server"

import z from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"
import { uploadFile } from "../../cloudinary/cloudinary"

const { object, string, coerce, instanceof: iof } = z

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
    conference_id: coerce.number().positive(),
    title: string().min(1),
    info: string().min(1).optional(),
    file: fileSchema.optional(),
})

export const createCircular = createAction(
    schema,
    async ({ file, ...data }) => {
        if (file) {
            const { url } = await uploadFile(file, {
                folder: "circulars",
                public_id: `conferenceId_${data.conference_id}_title_${data.title}_${Date.now()}`,
            })
            return await DB.circular.create({
                data: {
                    ...data,
                    url,
                },
            })
        }
        return await DB.circular.create({
            data,
        })
    },
)
