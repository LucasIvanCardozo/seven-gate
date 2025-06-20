"use client"

import { QrScanner } from "@/app/components/QrScanner"
import { useUI } from "@/app/contexts/UIContext"
import { ProfileDTO } from "@/app/lib/actions/profiles/get.profile"

export const MarkAssistanceScanner = ({ id }: ProfileDTO) => {
    const { showToast } = useUI()

    return (
        <QrScanner
            onScan={console.log}
            onError={(error) => showToast.error(`${error}`)}
        />
    )
}
