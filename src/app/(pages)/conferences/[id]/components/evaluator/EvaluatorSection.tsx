"use server"
import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { getPresentationsForEvaluator } from "@/app/lib/actions/presentations/get.presentations.for.evaluator"
import { Downloader } from "../Downloader"
import { EvaluatePresentationButton } from "./evaluatePresentation/EvaluatePresentationButton"
import { getConference } from "@/app/lib/actions/conferences/get.conference"

export const EvaluatorSection = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { roles, profileId } = data

    if (!roles?.includes("evaluador")) return null

    const { data: presentations } = await getPresentationsForEvaluator({
        conferenceId: id,
        profileId,
    })
    if (!presentations) return null

    return (
        <Section title="Presentaciones a evaluar">
            {presentations.map(({ id, url, axis, title }) => (
                <article key={id} className="card white">
                    <Header>
                        <span>{title}</span>
                        <div className="flex">
                            <EvaluatePresentationButton id={id} />
                            <Downloader url={url} title={axis.title + ".pdf"} />
                        </div>
                    </Header>
                    <span>Eje: {axis.title}</span>
                </article>
            ))}
        </Section>
    )
}
