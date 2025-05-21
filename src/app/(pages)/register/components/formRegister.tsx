"use client"

import { useFormStatus } from "react-dom"
import { useUI } from "../../../contexts/UIContext"
import { useRouter } from "next/navigation"
import { createUser } from "@/app/lib/users/create.users"

export default function FormRegister() {
    const { pending } = useFormStatus()
    const { showToast } = useUI()
    const router = useRouter()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        createUser(new FormData(event.currentTarget))
            .then(({ goTo }) => {
                showToast.success("Registrado con exito")
                router.push(goTo)
            })
            .catch((error) =>
                showToast.error(error?.message ?? "Error al crear el usuario"),
            )
    }

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Datos personales</legend>
                <label>
                    Nombre:
                    <input type="text" name="name" />
                </label>
                <label>
                    Apellido:
                    <input type="text" name="lastname" />
                </label>
                <label>
                    Teléfono:
                    <input type="tel" name="phone" />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <label>
                    Contraseña:
                    <input type="password" name="password" />
                </label>
                <label>
                    Confirmar contraseña:
                    <input type="password" name="password_confirmation" />
                </label>
                <button className="blue" disabled={pending}>
                    {pending ? "..." : "Registrarme"}
                </button>
            </fieldset>
        </form>
    )
}
