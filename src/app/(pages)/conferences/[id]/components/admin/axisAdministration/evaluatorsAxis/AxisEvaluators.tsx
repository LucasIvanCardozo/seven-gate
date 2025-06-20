"use server"

import { getAxis } from "@/app/lib/actions/axis/get.axis"
import { getEvaluatorsToAssign } from "@/app/lib/actions/profiles/get.evaluators.to.assign"
import { RoleAdministrationButton } from "../../roleAdministration/RoleAdministrationButton"
import { AxisEvaluatorForm } from "./AxisEvaluatorForm"
import { EvaluatorDeleteButton } from "./EvaluatorDeleteButton"

export const AxisEvaluators = async (props: { id: number }) => {
    const { data: axis } = await getAxis(props)
    if (!axis) return null

    const { data: evaluatorsToAssign } = await getEvaluatorsToAssign(props)
    if (!evaluatorsToAssign) return null

    const { evaluators, conference_id } = axis

    return (
        <div id={props.id.toString()}>
            {evaluators.map(({ id, name, lastname }) => (
                <article key={id} className="flex">
                    {name} {lastname}
                    <EvaluatorDeleteButton
                        axis_id={props.id}
                        evaluator_id={id}
                    />
                </article>
            ))}

            {!!evaluatorsToAssign.length ? (
                <AxisEvaluatorForm id={props.id} evaluatorsToAssign={evaluatorsToAssign} />
            ) : (
                <>
                    <span>
                        No hay más evaluadores en el congreso para agregar. Por
                        favor agregalos presionando el botón
                    </span>
                    <RoleAdministrationButton id={conference_id} />
                </>
            )}
        </div>
    )
}
