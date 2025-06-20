import { AdminSection } from "./components/admin2/AdminSection"
import { AxisSection } from "./components/axis2/AxisSection"
import { EvaluatorSection } from "./components/evaluator2/EvaluatorSection"
import { Info } from "./components/Info"
import { MyPresentations } from "./components/speaker/MyPresentations"
import { Stats } from "./components/Stats"
import { LogoImage } from "./components/LogoImage"
import { Circulars } from "./components/Circulars"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = +(await params).id

    return (
        <main>
            <LogoImage id={id} />

            <Info id={id} />

            <AdminSection id={id} />

            <EvaluatorSection id={id} />

            <MyPresentations id={id} />

            <AxisSection id={id} />

            <Stats id={id} />

            <Circulars id={id} />
        </main>
    )
}
