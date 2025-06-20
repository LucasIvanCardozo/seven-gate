"use server"

import { Section } from "@/app/components/Section"
import { getAxisByConference } from "@/app/lib/actions/axis/get.axis.by.conference"
import { AxisEvaluators } from "./AxisEvaluators"
import { EvaluatorAxisSelect } from "./EvaluatorAxisSelect"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"

export const EvaluatorsAxisSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getAxisByConference({ id })
    if (!data) return null

    const axis = data.hasEvaluators.concat(data.noEvaluators)

    return (
        <Section title="Evaluadores">
            <EvaluatorAxisSelect axis={axis}>
                {axis.map(({id}) => (
                    <AxisEvaluators key={id} id={id} />
                ))}
            </EvaluatorAxisSelect>
        </Section>
    )
}
