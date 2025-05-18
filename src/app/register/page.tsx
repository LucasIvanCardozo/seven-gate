"use client"

import { useRouter } from "next/navigation"
import { type CreateUserProps } from "../lib/db/users/create.users"

export default function Register() {
    const router = useRouter()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(
            formData.entries()
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
            alert("Usuario creado con éxito")
            router.push("/")
        } else {
            const { message } = await response.json()
            alert(message)
        }
    }

    return (
        <section>
            <h2>Registro</h2>
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
        </section>
    )
}
