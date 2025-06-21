import { Section } from "@/app/components/Section"
import Image from "next/image"
import Styles from "./Sponsors.module.css"

const sponsors = [
    { src: "/images/UTN.png", alt: "UTN" },
    { src: "/images/unmdp.png", alt: "UNMDP" },
    { src: "/images/FCEFyN.png", alt: "UTN repeat" },
    { src: "/images/UTN.png", alt: "UTN" },
    { src: "/images/unmdp.png", alt: "UNMDP" },
    { src: "/images/FCEFyN.png", alt: "UTN repeat" },
]

export const Sponsors = ({ id }: { id: number }) => {
    return (
        <Section title="Auspiciantes">
            <div className={Styles.carouselWrapper}>
                <div className={Styles.carouselTrack}>
                    {sponsors.map(({ src, alt }, index) => (
                        <div key={index} className={Styles.sponsorCard}>
                            <Image
                                alt={alt}
                                src={src}
                                width={200}
                                height={100}
                                quality={85}
                                style={{
                                    objectFit: "contain",
                                    padding: ".3rem",
                                    backgroundColor: "white",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
