"use client"
import { SubmitButton } from "@/app/components/SubmitButton"
import { useUI } from "@/app/contexts/UIContext"
import { createSponsor } from "@/app/lib/actions/sponsors/create.sponsor"
import { formToData } from "@/app/utils/formToData"
import { useRouter } from "next/navigation"
import { startTransition } from "react"

export const SponsorAdministrationForm = ({ id }: { id: number }) => {
    const { showToast } = useUI()
    const router = useRouter()

    return (
        <form
            action={async (formData) => {
                const data = formToData(formData)

                const { error } = await createSponsor({
                    id,
                    ...data,
                })

                if (error) showToast.error(error)
                else {
                    showToast.success("Auspiciante agregado correctamente")
                    startTransition(router.refresh)
                }
            }}
        >
            <label>
                Link del sitio:
                <input type="url" name="link_site" />
            </label>
            <label>
                Logo:
                <input type="file" accept="image/*" name="file" />
            </label>
            <SubmitButton className="blue">Agregar</SubmitButton>
        </form>
    )
}
