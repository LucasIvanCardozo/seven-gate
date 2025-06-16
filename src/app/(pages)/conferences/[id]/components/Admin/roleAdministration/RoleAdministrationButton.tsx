import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { DeleteRoleSection } from "./deleteRole/DeleteRoleSection"
import { NewRoleSection } from "./newRole/NewRoleSection"
import { TabsRolesAdmin } from "../TabsRolesAdmin"

export const RoleAdministrationButton = ({ id }: Pick<Conference, "id">) => {
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
