"use server"

import { hash } from "@/app/utils/bcrypt"
import { DB } from "../db/db"
import { sendEmail } from "../resend/resend"

export const createUser = async (formData: FormData) => {
    const rawData = Object.fromEntries(
        formData.entries(),
    ) as unknown as CreateUserProps & { password_confirmation: string }

    const { password_confirmation, ...data } = rawData
    const { name, email, password } = data

    if (password !== password_confirmation)
        throw new Error("Las contraseñas no coinciden")

    const user = await DB.users.findFirst({ where: { email } })
    if (user) throw new Error(`El usuario ${email} ya existe`)

    data.password = hash(password)

    const created = await DB.users.create({
        data,
    })

    await sendEmail({
        to: email,
        subject: `Te damos la bienvenida ${name} a Seven Gate!`,
        html: `<h1 style="font-size: 40px">Hola ${name}!</h1>`,
    })

    return {
        ...created,
        goTo: "/",
    }
}

export type CreateUserProps = Parameters<typeof DB.users.create>[0]["data"]
