import { NextResponse } from "next/server"
import { createUser } from "@/app/lib/db/users"

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const user = await createUser(data)
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Error al crear el usuario",
            },
            { status: 500 }
        )
    }
}
