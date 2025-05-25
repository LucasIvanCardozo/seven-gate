import { Section } from "@/app/components/Section"
import { EnrollButton } from "../components/enroll/EnrollButton"
import {
    getConference,
    getConferenceAdmins,
} from "@/app/lib/actions/conferences/get.conference"
import { redirect } from "next/navigation"
import { Axis } from "./components/Axis"
import { Header } from "@/app/components/Header"
import { MyPresentations } from "./components/MyPresentations"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = +(await params).id

    const { data: conference } = await getConference({ id })
    if (!conference) return redirect("/conferences")

    const { data: admins } = await getConferenceAdmins({ id })

    const { title, logo_url } = conference

    return (
        <main>
            <img src={logo_url} />
            <Section
                title={
                    <Header>
                        <h2>{title}</h2>
                        <EnrollButton {...conference} />
                    </Header>
                }
            >
                {admins && (
                    <div>
                        <h3>Administradores: </h3>
                        <ul>
                            {admins.map((item) => (
                                <li key={item.id}>{item.users.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Section>

            <MyPresentations {...conference} />

            <Axis {...conference} />

            <Section title="Stats"></Section>
        </main>
    )
}
