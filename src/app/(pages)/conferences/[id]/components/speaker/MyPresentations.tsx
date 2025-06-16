"use server"
import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { getPresentations } from "@/app/lib/actions/presentations/get.presentations"
import { Downloader } from "../Downloader"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import Styles from "./MyPresentations.module.css"

export const MyPresentations = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { roles } = data

    const { data: presentations } = await getPresentations({ id })
    if (!presentations?.length || !roles?.includes("ponente")) return null

    return (
        <Section title="Mis ponencias">
            {presentations.map(({ id, url, axis, state, comments }) => (
                <article key={id} className={`${Styles[state]} card white`}>
                    <Header>
                        <div>
                            <p>Eje: {axis.title}</p>
                            {comments && <p>{comments}</p>}
                        </div>
                        <Downloader url={url} title={axis.title + ".pdf"} />
                    </Header>
                </article>
            ))}
        </Section>
    )
}
