"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { GetProfiles } from "@/app/lib/actions/profiles/get.profiles"
import { useState } from "react"
import { useUI } from "@/app/contexts/UIContext"
import { deleteRoleFromProfile } from "@/app/lib/actions/roles/delete.role.from.profile"
import { startTransition } from "react"
import { useRouter } from "next/navigation"
export const DeleteRoleForm = ({ profiles }: { profiles: GetProfiles }) => {
    const { showToast } = useUI()
    const router = useRouter()

    const [email, setEmail] = useState<string | null>(null)

    const profile = profiles.find((item) => item.users.email === email)
    const users = profiles.map((item) => item.users)

    return (
        <form
            action={async (formData) => {
                const email = formData.get("email")
                const role_ids = formData.getAll("role_id")

                const { error, data } = await deleteRoleFromProfile({
                    email,
                    role_ids,
                })

                if (error) showToast.error(error)
                else {
                    showToast.success(
                        `Rol eliminado correctamente.${data?.profileDeleted ? " Perfil eliminado" : ""}`,
                    )

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
                    onChange={({ target: { value } }) => setEmail(value)}
                />
            </label>

            <datalist id="user-email">
                {users.map((user) => (
                    <option key={user.email} value={user.email}>
                        {user.name} {user.lastname}
                    </option>
                ))}
            </datalist>

            {!!profile && (
                <div>
                    {profile.profile_roles
                        .filter((item) => item.roles.role != "admin")
                        .map(({ roles }) => (
                            <label key={roles.id}>
                                <input
                                    type="checkbox"
                                    defaultValue={roles.id}
                                    name="role_id"
                                />
                                {roles.role}
                            </label>
                        ))}
                </div>
            )}

            <SubmitButton className="red" disabled={!profile}>
                Eliminar
            </SubmitButton>
        </form>
    )
}
