"use server"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Tabs } from "@/app/(pages)/conferences/components/Tabs"
import { NewAxisSection } from "./newAxis/NewAxisSection"
import { DeleteAxisSection } from "./deleteAxis/DeleteAxisSection"
import { EvaluatorsAxisSection } from "./evaluatorsAxis/EvaluatorsAxisSection"

export const AxisAdministrationButton = async ({
    id,
}: Pick<Conference, "id">) => {
    return (
        <Modal opener={<button className="blue">Ejes</button>}>
            <Section title="Administrar ejes">
                <Tabs
                    tabs={[
                        {
                            label: "Nuevo",
                            component: <NewAxisSection id={id} />,
                        },
                        {
                            label: "Evaluadores",
                            component: <EvaluatorsAxisSection id={id} />,
                        }
                    ]}
                />
            </Section>
        </Modal>
    )
}
