import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { redirect } from "next/navigation"
import { AdminSection } from "./components/Admin/AdminSection"
import { AxisSection } from "./components/Axis/AxisSection"
import { EvaluatorSection } from "./components/Evaluator/EvaluatorSection"
import { Info } from "./components/Info"
import { MyPresentations } from "./components/MyPresentations"
import { Stats } from "./components/Stats"

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

            <Info id={id} />

            <AdminSection id={id} />

            <EvaluatorSection {...data} />

            <MyPresentations {...data} />

            <AxisSection {...data} />

            <Stats {...data} />
        </main>
    )
}
