"use client"

import { createUser, type CreateUserProps } from "../api/users/create.users"

export default function Register() {
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as CreateUserProps & { password_confirmation: string }

        const { password_confirmation, ...rest } = data

        if (rest.password !== password_confirmation)
            return alert("Las contraseñas no coinciden")

        try {
            await createUser(rest)
            alert("Usuario creado con éxito")
        } catch (error) {
           alert(error instanceof Error ? error.message : "No se pudo crear el usuario")       
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
