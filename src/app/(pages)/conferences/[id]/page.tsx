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
import { DayJs } from "@/app/utils/DayJs"
import { capitalize } from "@/app/utils/capitalize"
import { EvaluatorSection } from "./components/EvaluatorSection"
import { Info } from "./components/Info"
import { Stats } from "./components/Stats"
import { AdminSection } from "./components/AdminSection"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = +(await params).id

    const { data } = await getConference({ id })
    if (!data) return redirect("/conferences")

    const { logo_url } = data

    return (
        <main>
            <img src={logo_url} />

            <Info {...data} />

            <AdminSection {...data} />

            <EvaluatorSection {...data} />

            <MyPresentations {...data} />

            <Axis {...data} />

            <Stats {...data} />
        </main>
    )
}
