"use server"

import { z } from "zod"
import createAction from "../createActions"
import { DB } from "../../db/db"
import { uploadFile } from "../../cloudinary/cloudinary"

const { object, string, number, instanceof: iof } = z
const fileSchema = iof(File)
    .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "El archivo debe pesar menos de 5MB",
    )
    .refine(
        (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
        "Solo se permiten imágenes",
    )

const schema = object({
    id: number().positive(),
    link_site: string().url(),
    file: fileSchema,
})

export const createSponsor = createAction(
    schema,
    async ({ id, link_site, file }) => {
        const { url } = await uploadFile(file, {
            folder: "sponsors",
            public_id: `linkSite_${link_site}_conferenceId_${id}`,
        })

        return DB.sponsors.create({
            data: {
                conference_id: id,
                image_url: url,
                link_site,
            },
        })
    },
)
