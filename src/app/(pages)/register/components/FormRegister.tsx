"use client"

import { createUser } from "@/app/lib/actions/users/create.users"
import { formToData } from "@/app/utils/formToData"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { useUI } from "../../../contexts/UIContext"
import Styles from "./FormRegister.module.css"
import { SubmitButton } from "@/app/components/SubmitButton"

export default function FormRegister() {
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            className={Styles.form}
            action={async (formData) => {
                const data = formToData(formData)

                if (data.password !== data.password_confirmation) {
                    showToast.error("Las contraseñas no coinciden")
                    return
                }

                const { error } = await createUser(data)

                if (error) showToast.error(error)
                else {
                    showToast.success("Registrado con exito")
                    await signIn("credentials", {
                        ...data,
                        redirect: false,
                    })
                    router.push("/conferences")
                }
            }}
        >
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
                <SubmitButton className="blue">Registrarme</SubmitButton>
            </fieldset>
        </form>
    )
}
