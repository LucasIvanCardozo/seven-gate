"use server"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { DeleteRoleForm } from "./DeleteRoleForm"
import { getProfiles } from "@/app/lib/actions/profiles/get.profiles"

export const DeleteRoleSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getProfiles({ conference_id: id })

    return (
        <Section title="Eliminar rol">
            {!!data?.length ? (
                <DeleteRoleForm profiles={data} />
            ) : (
                <p>Todavía no hay roles asignados</p>
            )}
        </Section>
    )
}
