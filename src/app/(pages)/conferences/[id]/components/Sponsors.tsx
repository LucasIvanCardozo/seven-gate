import { Section } from "@/app/components/Section"
import Image from "next/image"

export const Sponsors = ({ id }: { id: number }) => {
    return (
        <Section title="Auspiciantes">
            <div className="flex">
                <div
                    style={{
                        width: "200px",
                        height: "100px",
                        position: "relative",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <Image
                        alt=""
                        src="/images/UTN.png"
                        width={200}
                        height={100}
                        style={{
                            objectFit: "contain", // Para logos proporcionales
                            padding: "12px", // Espacio interno para logos
                            backgroundColor: "white", // Fondo para contrastar
                        }}
                        quality={85}
                    />
                </div>
                <div
                    style={{
                        width: "200px",
                        height: "100px",
                        position: "relative",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <Image
                        alt=""
                        src="/images/UNMDP.jpg"
                        width={200}
                        height={100}
                        style={{
                            objectFit: "contain", // Para logos proporcionales
                            padding: "12px", // Espacio interno para logos
                            backgroundColor: "white", // Fondo para contrastar
                        }}
                        quality={85}
                    />
                </div>
            </div>
        </Section>
    )
}
