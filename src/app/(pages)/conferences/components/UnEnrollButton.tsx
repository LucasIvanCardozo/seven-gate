import { Modal } from "@/app/components/Modal"
import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/conferences/get.my.conferences"
import { DayJs } from "@/app/utils/DayJs"
import React from "react"

export const UnEnrollButton = ({ id, date, title, roles }: Conference) => {
    if (!roles?.length) return null
    
    const now = DayJs()
    if (now.isAfter(DayJs(date))) return null

    return (
        <Modal opener={<button>Desinscribirme</button>}>
            <Section
                title={`¿Está seguro que desea desinscribirse de ${title}?`}
            >
                <form>
                    {roles.map((item) => (
                        <label key={item} className="inline left">
                            <input type="checkbox" name={item} />
                            {item}
                        </label>
                    ))}
                    <button className="red">Confirmar</button>
                </form>
            </Section>
        </Modal>
    )
}
