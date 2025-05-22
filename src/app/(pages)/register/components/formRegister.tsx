"use client"

import { useFormStatus } from "react-dom"
import { useUI } from "../../../contexts/UIContext"
import { useRouter } from "next/navigation"
import { createUser } from "@/app/lib/actions/users/create.users"
import { formToData } from "@/app/utils/formToData"

export default function FormRegister() {
    const { pending } = useFormStatus()
    const { showToast } = useUI()
    const router = useRouter()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        if (formData.get("password") !== formData.get("password_confirmation"))
            return showToast.error("Las contraseñas no coinciden")

        const response = await createUser(formToData(formData))

        if (!response.success) return showToast.error(response.error)

        showToast.success("Registrado con exito")
        router.push(response.data.goTo)
    }

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Datos personales</legend>
                <label>
                    Nombre:
                    <input required type="text" name="name" />
                </label>
                <label>
                    Apellido:
                    <input required type="text" name="lastname" />
                </label>
                <label>
                    Teléfono:
                    <input required type="tel" name="phone" />
                </label>
                <label>
                    Email:
                    <input required type="email" name="email" />
                </label>
                <label>
                    Contraseña:
                    <input required type="password" name="password" />
                </label>
                <label>
                    Confirmar contraseña:
                    <input
                        required
                        type="password"
                        name="password_confirmation"
                    />
                </label>
                <button className="blue" disabled={pending}>
                    {pending ? "..." : "Registrarme"}
                </button>
            </fieldset>
        </form>
    )
}
