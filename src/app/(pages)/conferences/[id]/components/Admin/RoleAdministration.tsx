import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { TabsRolesAdmin } from "./TabsRolesAdmin"
import { NewRoleSection } from "./NewRoleSection"
import { DeleteRoleSection } from "./DeleteRoleSection"

export const RoleAdministration = ({ id }: Pick<Conference, "id">) => {
    return (
        <Modal opener={<button className="blue">Administrar roles</button>}>
            <Section title="Administrar roles">
                <TabsRolesAdmin>
                    <NewRoleSection id={id} />
                    <DeleteRoleSection id={id} />
                </TabsRolesAdmin>
            </Section>
        </Modal>
    )
}
