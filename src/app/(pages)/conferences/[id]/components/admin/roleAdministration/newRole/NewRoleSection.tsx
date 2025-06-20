"use server"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { NewRoleForm } from "./NewRoleForm"
import { getRoles } from "@/app/lib/actions/roles/get.roles"
import { getProfiles } from "@/app/lib/actions/profiles/get.profiles"

export const NewRoleSection = async ({ id }: Pick<Conference, "id">) => {
    const { data: roles } = await getRoles()
    if (!roles) return null
    
    const { data: profiles } = await getProfiles({ conference_id: id })
    if (!profiles) return null

    return (
        <Section title="Nuevo rol">
            <NewRoleForm id={id} roles={roles} profiles={profiles} />
        </Section>
    )
}
