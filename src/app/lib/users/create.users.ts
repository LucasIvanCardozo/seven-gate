import { hash } from "@/app/utils/bcrypt"
import { DB } from "../db/db"
import { sendEmail } from "../resend/resend"

export const createUser = async (data: CreateUserProps) => {
    const { name, email } = data

    const user = await DB.users.findFirst({ where: { email } })
    if (user) throw new Error(`El usuario ${email} ya existe`)

    data.password = hash(data.password)

    await sendEmail({
        to: email,
        subject: `Te damos la bienvenida ${name} a Seven Gate!`,
        html: `<h1 style="font-size: 40px">Hola ${name}!</h1>`,
    })

    return DB.users.create({
        data,
    })
}

export type CreateUserProps = Parameters<typeof DB.users.create>[0]["data"]
