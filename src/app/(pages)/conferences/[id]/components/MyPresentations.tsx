import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { getPresentations } from "@/app/lib/actions/presentations/get.presentations"
import { Downloader } from "./Downloader"

export const MyPresentations = async ({ id }: Pick<Conference, "id">) => {
    const { data: presentations } = await getPresentations({ id })
    if (!presentations?.length) return null

    return (
        <Section title="Mis ponencias">
            {presentations.map(({ id, url, axis }) => (
                <article key={id} className="card white">
                    <Header>
                        <p>Eje: {axis.title}</p>
                        <Downloader url={url} title={axis.title + ".pdf"} />
                    </Header>
                </article>
            ))}
        </Section>
    )
}
