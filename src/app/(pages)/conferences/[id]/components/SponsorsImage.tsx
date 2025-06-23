"use client"

import Styles from "./Sponsors.module.css"
import { sponsors } from "@prisma/client"

export const SponsorsImage = ({ image_url, link_site }: sponsors) => {
    return (
        <div className={Styles.sponsorCard}>
            <img
                alt="Sponsor"
                src={image_url}
                width={200}
                height={100}
                onClick={() => window.open(link_site, "_blank")}
                style={{
                    objectFit: "contain",
                    padding: ".3rem",
                    backgroundColor: "white",
                }}
            />
        </div>
    )
}
