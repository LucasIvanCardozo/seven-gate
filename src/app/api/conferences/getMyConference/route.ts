import { getMyConferences } from "@/app/lib/conferences/get.my.conferences"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("user_id")
        if (!userId)
            return NextResponse.json(
                {
                    message: "Falta user_id",
                },
                { status: 400 },
            )
        const conferences = await getMyConferences(+userId)
        return NextResponse.json(conferences, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Error al traer las conferencias",
            },
            { status: 500 },
        )
    }
}
