"use server"

import { hash } from "@/app/utils/bcrypt"
import { DB } from "../db/db"
import { sendEmail } from "../resend/resend"
import { z } from "zod"
import { parse } from "@/app/utils/parse"

const schema = z
    .object({
        name: z.string().min(1),
        lastname: z.string().min(1),
        email: z.string().email(),
        password: z.string().refine(
            (value) => value.length >= 8,
            () => ({
                message: "La contraseña debe tener al menos 8 caracteres",
                path: ["password"],
            }),
        ),
        phone: z.string(),
        password_confirmation: z.string(),
    })
    .refine(
        (data) => data.password === data.password_confirmation,
        () => ({
            message: "Las contraseñas no coinciden",
            path: ["password_confirmation"],
        }),
    )

export const createUser = async (formData: FormData) => {
    const rawData = parse({ schema, data: formData })

    const { password_confirmation: _, ...data } = rawData
    const { name, email, password } = data

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

    const { password: __, ...rest } = created

    return {
        ...rest,
        goTo: "/",
    }
}

export type CreateUserProps = z.infer<typeof schema>
