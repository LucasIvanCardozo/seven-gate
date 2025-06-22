"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { formToData } from "@/app/utils/formToData"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function FormLogin() {
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            action={async (formData) => {
                const data = formToData(formData)

                const response = await signIn("credentials", {
                    ...data,
                    redirect: false,
                })
                if (!response) return

                if (response.error) showToast.error(response.error)
                else if (response.ok) router.push("/")
            }}
        >
            <fieldset>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <label>
                    Contraseña:
                    <input type="password" name="password" />
                </label>
                <SubmitButton className="blue">Login</SubmitButton>
            </fieldset>
        </form>
    )
}
