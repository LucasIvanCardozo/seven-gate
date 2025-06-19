"use server"
import { z } from "zod"
import createAction from "../createActions"
import { getEvaluatorsByAxis } from "./get.evaluators.by.axis"
import { deleteRoleFromProfile } from "../roles/delete.role.from.profile"
import { getRoles } from "../roles/get.roles"
import { DB } from "../../db/db"

const { object, number } = z
const schema = object({
    evaluator_id: number().positive(),
    axis_id: number().positive(),
})

export const deleteEvaluator = createAction(
    schema,
    async ({ evaluator_id, axis_id }) => {
        const { data: evaluators } = await getEvaluatorsByAxis({ id: axis_id })
        if (!evaluators) return null

        if (evaluators.length <= 1)
            throw new Error("No puedes eliminar al último evaluador")

        const { data: roles } = await getRoles()
        if (!roles) throw new Error("No se pudo obtener los roles")

        const evaluator_role_id = roles.find(({ role }) => role === "evaluador")
        if (!evaluator_role_id) throw new Error("No se pudo encontrar el rol")

            console.dir({
                evaluator_id,
                evaluators
            }, { depth: Infinity })

        const evaluator_email = evaluators.find(
            (evaluator) => evaluator.id == evaluator_id,
        )?.users.email
        if (!evaluator_email)
            throw new Error("No se pudo obtener el email del evaluador")

        const presentations = await DB.presentations.findMany({
            where: {
                state: "pending",
                evaluator_profile_id: evaluator_id,
                axis_id,
            },
        })

        const { data: profile } = await deleteRoleFromProfile({
            email: evaluator_email,
            role_ids: [evaluator_role_id],
        })

        await DB.evaluator_axis_assignments.delete({
            where: {
                profile_id_axis_id: {
                    axis_id,
                    profile_id: evaluator_id,
                },
            },
        })

        const others = evaluators.filter((item) => item.id != evaluator_id)

        for await (const { id } of presentations) {
            const evaluator = others.at(
                Math.floor(Math.random() * others.length),
            )
            if (!evaluator) throw new Error("que re carajeanos pasó breo")
            await DB.presentations.update({
                where: {
                    id,
                },
                data: { evaluator_profile_id: evaluator.id },
            })
        }

        return profile
    },
)
