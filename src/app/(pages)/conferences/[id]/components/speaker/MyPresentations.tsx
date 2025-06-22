"use server"
import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { getMyPresentations } from "@/app/lib/actions/presentations/get.my.presentations"
import { DayJs } from "@/app/utils/DayJs"
import { Downloader } from "../Downloader"
import Styles from "./MyPresentations.module.css"
import { AddPresentation } from "./addPresentation/AddPresentation"

export const MyPresentations = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { roles } = data

    const { data: presentations } = await getMyPresentations({ id })
    if (!presentations?.length || !roles?.includes("ponente")) return null

    return (
        <Section title="Mis ponencias">
            {presentations.map(
                ({ id, url, axis, state, comments, created_at, title }) => (
                    <article key={id} className={`${Styles[state]} card`}>
                        <Header>
                            <h3>{title}</h3>
                            <Downloader url={url} title={axis.title + ".pdf"} />
                        </Header>

                        <span>
                            <strong>Eje:</strong> {axis.title}
                        </span>

                        <div>
                            <span>
                                {state === "pending" &&
                                    "Pendiente de evaluación"}
                                {state === "approved" && "Aprobada"}
                                {state === "approved_with_comments" &&
                                    "Rehacer"}
                                {state === "re_sent" && "Reenviada"}
                                {state === "rejected" && "Rechazada"}
                            </span>

                            {comments && <p>{comments}</p>}
                        </div>

                        <span>
                            <strong>Enviado:</strong>{" "}
                            {DayJs(created_at).format("LLL")}
                        </span>

                        {state === "approved_with_comments" && (
                            <AddPresentation id={axis.id} />
                        )}
                    </article>
                ),
            )}
        </Section>
    )
}
