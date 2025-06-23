"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import {
    Conference,
    Role,
} from "@/app/lib/actions/conferences/get.my.conferences"
import { createProfile } from "@/app/lib/actions/profiles/create.profile"
import { GetProfiles } from "@/app/lib/actions/profiles/get.profiles"
import { formToData } from "@/app/utils/formToData"
import { startTransition } from "react"
import { useRouter } from "next/navigation"

export const NewRoleForm = ({
    id,
    roles,
    profiles,
}: {
    id: Conference["id"]
    roles: { id: number; role: Role }[]
    profiles: GetProfiles
}) => {
    const { showToast } = useUI()
    const router = useRouter()

    const users = profiles.map((item) => item.users)

    return (
        <form
            action={async (formData) => {
                const data = formToData(formData)

                const { error } = await createProfile({
                    conference_id: id,
                    ...data,
                })
                if (error) showToast.error(error)
                else {
                    showToast.success("Perfil agregado correctamente :)")
                    startTransition(router.refresh)
                }
            }}
        >
            <label>
                Usuario:
                <input
                    type="text"
                    name="email"
                    list="user-email"
                    autoComplete="off"
                />
            </label>

            <datalist id="user-email">
                {users.map((user) => (
                    <option key={user.email} value={user.email}>
                        {user.name} {user.lastname}
                    </option>
                ))}
            </datalist>

            <label>
                Rol:
                <select name="role_id">
                    {roles?.map(({ id, role }) => (
                        <option key={id} value={id}>
                            {role}
                        </option>
                    ))}
                </select>
            </label>

            <SubmitButton className="blue">Agregar</SubmitButton>
        </form>
    )
}
