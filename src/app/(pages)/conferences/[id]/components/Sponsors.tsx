"use server"
import { Section } from "@/app/components/Section"
import Styles from "./Sponsors.module.css"
import { getSponsors } from "@/app/lib/actions/sponsors/get.sponsors"
import { SponsorsImage } from "./SponsorsImage"

const sponsors = [
    { src: "/images/UTN.png", alt: "UTN" },
    { src: "/images/unmdp.png", alt: "UNMDP" },
    { src: "/images/FCEFyN.png", alt: "UTN repeat" },
    { src: "/images/UTN.png", alt: "UTN" },
    { src: "/images/unmdp.png", alt: "UNMDP" },
    { src: "/images/FCEFyN.png", alt: "UTN repeat" },
]

export const Sponsors = async ({ id }: { id: number }) => {
    const { data: sponsors } = await getSponsors({ id })
    if (!sponsors) return null

    const makeSponsors =
        sponsors.length == 1
            ? sponsors.concat(sponsors.concat(sponsors.concat(sponsors)))
            : sponsors.concat(sponsors)

    return (
        <Section title="Auspiciantes">
            <div className={Styles.carouselWrapper}>
                <div className={Styles.carouselTrack}>
                    {makeSponsors.map((sponsor, index) => (
                        <SponsorsImage key={index} {...sponsor} />
                    ))}
                </div>
            </div>
        </Section>
    )
}
