import { authOptions } from "@/app/lib/auth/authOptions"
import {
    getMyConferences,
    type Conference,
} from "@/app/lib/conferences/get.my.conferences"
import { getServerSession, Session } from "next-auth"
import { Suspense } from "react"

const { NEXTAUTH_URL } = process.env

// Esta funcion era innecesaria porque al estar del lado del servidor puedo tomar el error directamente
// const getMyConferences = (userId: string): Promise<GetMyConferences> =>
//     fetch(
//         `${NEXTAUTH_URL}/api/conferences/getMyConference?user_id=${userId}`,
//     ).then((res) => res.json())

export default async function Conferences() {
    return (
        <section>
            <Suspense fallback={<h1>Cargando conferencias...</h1>}>
                <MyConferences />
            </Suspense>
            <InComingConferences />
        </section>
    )
}

const MyConferences = async () => {
    const session = (await getServerSession(authOptions)) as Session | null
    await new Promise((r) => setTimeout(r, 3000))
    if (!session) return null

    // const { upcomingConferences, oldConferences } = await getMyConferences(
    //     +session.user.id,
    // )

    return (
        <div>
            {/* <h2>Conferencias próximas</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: 20,
                    padding: "20px 10px",
                }}
            >
                {upcomingConferences.map((item) => (
                    <Conference key={item.id} {...item} />
                ))}
            </div>
            <hr />

            <h2>Conferencias antiguas</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: 20,
                    padding: "20px 10px",
                }}
            >
                {oldConferences.map((item) => (
                    <Conference key={item.id} {...item} />
                ))}
            </div> */}
        </div>
    )
}

const InComingConferences = () => null

const Conference = ({ title, roles }: Conference) => {
    return (
        <article className="card egg-lead">
            <h3>{title}</h3>

            {roles && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 5,
                    }}
                >
                    {roles.map((item) => (
                        <span key={item} className="tag white">
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </article>
    )
}
