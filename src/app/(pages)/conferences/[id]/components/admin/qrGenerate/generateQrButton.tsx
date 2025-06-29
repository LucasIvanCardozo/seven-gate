"use server"

import { Header } from "@/app/components/Header"
import { Modal } from "@/app/components/Modal"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import QRCode from "react-qr-code"
import { Downloader } from "../../Downloader"
import { Section } from "@/app/components/Section"

export const GenerateQrButton = async ({ id }: Pick<Conference, "id">) => {
    const { data: conference } = await getConference({ id })
    if (!conference) return null

    const { title } = conference

    return (
        <Modal opener={<button className="blue">QR</button>}>
            <Section title={title}>
                <QRCode style={{ width: "100%" }} value={title} />
            </Section>
        </Modal>
    )
}
