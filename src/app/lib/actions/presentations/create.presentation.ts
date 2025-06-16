"use server"

import { z } from "zod"
import createAction from "../createActions"
import { uploadFile } from "../../cloudinary/cloudinary"
import { DB } from "../../db/db"
import { getServerUser } from "../users"
import { DayJs } from "@/app/utils/DayJs"
import { getAxis } from "../axis/get.axis"
import { getProfile } from "../profiles/get.profile"
import { canUploadPresentation } from "./can.upload.presentation"

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
    axis_id: number().positive(),
    file: fileSchema,
})

export const createPresentation = createAction(
    schema,
    async ({ file, axis_id }) => {
        const { user } = await getServerUser()
        if (!user) throw new Error("Necesitas estar logueado")

        const { data: axis } = await getAxis({ id: axis_id })
        if (!axis) throw new Error("No se pudo encontrar el eje")

        const { conference_id } = axis
        const { data: profile } = await getProfile({ conference_id })

        if (!profile) throw new Error("No estás inscripto en la conferencia")
        if (DayJs().isAfter(profile.conferences.presentation_limit_date))
            throw new Error("Ya no puedes subir presentaciones")

        const presenter_profile_id = profile.id

        const { data: canUpload } = await canUploadPresentation({
            conference_id,
        })
        if (!canUpload)
            throw new Error("Ya tenés una ponencia en esta conferencia.")

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
