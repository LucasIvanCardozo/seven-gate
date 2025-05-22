"use server"

import { hash } from "@/app/utils/bcrypt"
import { DB } from "../../db/db"
import { sendEmail } from "../../resend/resend"
import { z } from "zod"
import createAction from "../createActions"

const { object, string } = z
const schema = object({
    name: string().min(1),
    lastname: string().min(1),
    email: string().email(),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    phone: string(),
})

export const createUser = createAction(schema, async (data) => {
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

    return { ...rest, goTo: "/" }
})

export type CreateUserProps = z.infer<typeof schema>
