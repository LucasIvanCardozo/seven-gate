"use server"
import { getPresentationsVotes } from "@/app/lib/actions/presentations/get.presentation.votes"
import { VotesCharts } from "./VotesCharts"

export const Votes = async ({ id }: { id: number }) => {
    const { data: votes } = await getPresentationsVotes({ id })
    if (!votes) return null

    const data = [
        {
            label: "Votos por ponencia",
            data: votes.map(({ title, count }) => ({
                primary: title,
                secondary: count,
            })),
        },
    ]

    if (!data[0].data.length) return null

    return (
        <div style={{ width: "100%", height: "100px" }}>
            <VotesCharts data={data} />
        </div>
    )
}
