"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import {
    Conference,
    Role,
} from "@/app/lib/actions/conferences/get.my.conferences"
import { createProfile } from "@/app/lib/actions/profiles/create.profile"
import { formToData } from "@/app/utils/formToData"

export const NewRoleForm = ({
    id,
    roles,
}: {
    id: Conference["id"]
    roles: { id: number; role: Role }[]
}) => {
    const { showToast } = useUI()
    return (
        <form
            action={async (formData) => {
                const data = formToData(formData)

                console.log(data)

                const { error } = await createProfile({
                    conference_id: id,
                    ...data,
                })
                if (error) showToast.error(error)
                else showToast.success("Perfil agregado correctamente :)")
            }}
        >
            <label>
                Email:
                <input type="email" name="email" />
            </label>

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
