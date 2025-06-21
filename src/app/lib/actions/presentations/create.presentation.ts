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
import { getEvaluatorsByAxis } from "../profiles/get.evaluators.by.axis"
import { getMyPresentations } from "./get.my.presentations"
import { markAsReSent } from "./mark.as.re.sent"

const { object, number, string, instanceof: iof } = z

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
    title: string().min(1),
    axis_id: number().positive(),
    file: fileSchema,
})

export const createPresentation = createAction(
    schema,
    async ({ file, title, axis_id }) => {
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

        const { data: evaluators } = await getEvaluatorsByAxis({ id: axis_id })

        const evaluator_profile_id = evaluators?.at(
            Math.floor(Math.random() * evaluators.length),
        )?.id
        if (!evaluator_profile_id)
            throw new Error("No hay evaluadores para este eje por el momento.")

        const { url } = await uploadFile(file, {
            folder: "presentations",
            public_id: `profileId_${presenter_profile_id}_axisId_${axis_id}`,
        })

        const { id } = await DB.presentations.create({
            data: {
                title,
                axis_id,
                presenter_profile_id,
                evaluator_profile_id,
                url,
            },
        })

        const { data: presentations } = await getMyPresentations({
            id: axis.conference_id,
        })
        const approvedWithComments = presentations?.find(
            ({ state }) => state === "approved_with_comments",
        )
        if (approvedWithComments)
            await markAsReSent({ id: approvedWithComments.id })

        return { id }
    },
)
