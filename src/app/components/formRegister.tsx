"use client"

import { useRouter } from "next/navigation"
import { useUI } from "../contexts/UIContext"
import { CreateUserProps } from "../lib/users"

export default function FormRegister() {
    const { showToast } = useUI()
    const router = useRouter()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(
            formData.entries(),
        ) as unknown as CreateUserProps & { password_confirmation: string }

        const { password_confirmation, ...rest } = data

        if (rest.password !== password_confirmation)
            return alert("Las contraseñas no coinciden")

        const response = await fetch("/api/users/create", {
            method: "POST",
            body: JSON.stringify(rest),
            headers: { "Content-Type": "application/json" },
        })
        if (response.ok) {
            showToast.success("Usuario creado con éxito")
            router.push("/")
        } else {
            const { message } = await response.json()
            showToast.error(message)
        }
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
                <button className="blue">Registrarme</button>
            </fieldset>
        </form>
    )
}
