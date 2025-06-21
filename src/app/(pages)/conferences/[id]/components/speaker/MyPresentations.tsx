"use server"
import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { getMyPresentations } from "@/app/lib/actions/presentations/get.my.presentations"
import { Downloader } from "../Downloader"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import Styles from "./MyPresentations.module.css"
import { AddPresentation } from "./addPresentation/AddPresentation"
import { canUploadPresentation } from "@/app/lib/actions/presentations/can.upload.presentation"
import { DayJs } from "@/app/utils/DayJs"
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
                    <article key={id} className={`${Styles[state]} card white`}>
                        <Header>
                            <h3>{title}</h3>
                            <Downloader url={url} title={axis.title + ".pdf"} />
                        </Header>
                        <span>Eje: {axis.title}</span>
                        <div>
                            {state === "pending" ? (
                                <span>Pendiente de evaluación</span>
                            ) : state === "approved" ? (
                                <span>Aprobada</span>
                            ) : state === "approved_with_comments" ? (
                                <span>Rehacer</span>
                            ) : state === "re_sent" ? (
                                <span>Reenviada</span>
                            ) : (
                                <span>Rechazada</span>
                            )}
                            {comments && (
                                <div>
                                    <p>{comments}</p>
                                </div>
                            )}
                        </div>
                        <span>{DayJs(created_at).format("LLL")} </span>
                        {state === "approved_with_comments" && (
                            <AddPresentation id={axis.id} />
                        )}
                    </article>
                ),
            )}
        </Section>
    )
}
