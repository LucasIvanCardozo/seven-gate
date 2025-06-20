import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { DeleteRoleSection } from "./deleteRole/DeleteRoleSection"
import { NewRoleSection } from "./newRole/NewRoleSection"
import { Tabs } from "@/app/(pages)/conferences/components/Tabs"

export const RoleAdministrationButton = ({ id }: Pick<Conference, "id">) => {
    return (
        <Modal opener={<button className="blue">Roles</button>}>
            <Section title="Administrar roles">
                <Tabs
                    tabs={[
                        {
                            label: "Nuevo",
                            component: <NewRoleSection id={id} />,
                        },
                        {
                            label: "Eliminar",
                            component: <DeleteRoleSection id={id} />,
                        },
                    ]}
                />
            </Section>
        </Modal>
    )
}
