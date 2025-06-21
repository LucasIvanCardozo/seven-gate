// MOCKED
"use client"

import { Header } from "@/app/components/Header"
import { useUI } from "@/app/contexts/UIContext"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { addVote } from "@/app/lib/actions/presentations/add.vote"
import { presentations } from "@prisma/client"

export const VotePresentationList = ({
    conference_id,
    presentations,
}: {
    conference_id: number
    presentations: presentations[]
}) => {
    const { showToast } = useUI()

    return (
        <section
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            {presentations.map(({ id, title }) => (
                <article key={id}>
                    <Header>
                        <h3>
                            <b>{title}</b>
                        </h3>
                        <button
                            className="blue"
                            onClick={() =>
                                addVote({
                                    conference_id,
                                    presentation_id: id,
                                }).then(({ error }) =>
                                    error
                                        ? showToast.error(error)
                                        : showToast.success(
                                              "Voto guardado correctamente",
                                          ),
                                )
                            }
                        >
                            Votar
                        </button>
                    </Header>
                </article>
            ))}
        </section>
    )
}
