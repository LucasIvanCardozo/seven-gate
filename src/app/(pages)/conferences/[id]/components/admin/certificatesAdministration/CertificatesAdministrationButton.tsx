"use client"

import { useUI } from "@/app/contexts/UIContext"

export const CertificatesAdministrationButton = ({ id }: { id: number }) => {
    const { showToast } = useUI()

    return (
        <button
            className="blue"
            onClick={() =>
                showToast.success("Certificados generados correctamente")
            }
        >
            Generar certificados
        </button>
    )
}
