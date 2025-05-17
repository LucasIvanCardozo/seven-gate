"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {

    const router = useRouter()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const response = await signIn("credentials", {
            ...data,
            redirect: false,
        })

        if (!response)
            return

        if (response.error) 
            return alert("Error: " + response.error)

        if (response.ok)
            router.push("/")
    }
    return (
        <section>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label>
                        Email:
                        <input type="email" name="email" />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="password" />
                    </label>
                    <button className="blue">Login</button>
                </fieldset>
            </form>
        </section>
    )
}
