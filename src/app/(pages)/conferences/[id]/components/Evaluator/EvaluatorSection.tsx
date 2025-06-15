import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { getPresentationsForEvaluator } from "@/app/lib/actions/presentations/get.presentations.for.evaluator"
import { Downloader } from "../Downloader"
import { EvaluatorForm } from "./EvaluatorForm"

export const EvaluatorSection = async ({
    profileId,
    roles,
}: Pick<Conference, "roles" | "profileId">) => {
    if (!roles?.includes("evaluador")) return null

    const { data } = await getPresentationsForEvaluator({ profileId })
    if (!data) return null

    return (
        <Section title="Presentaciones a evaluar">
            {data.map(({ id, url, axis }) => (
                <article key={id} className="card white">
                    <Header>
                        <span>{axis.title}</span>
                        <div className="flex">
                            <EvaluatorForm id={id} />
                            <Downloader url={url} title={axis.title + ".pdf"} />
                        </div>
                    </Header>
                </article>
            ))}
        </Section>
    )
}
