import { Header } from "@/app/components/Header"
import { Section } from "@/app/components/Section"
import { capitalize } from "@/app/utils/capitalize"
import { DayJs } from "@/app/utils/DayJs"
import { EnrollButton } from "../../components/enroll/EnrollButton"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"
import { getConferenceAdmins } from "@/app/lib/actions/conferences/get.conference"

export const Info = (props: Conference) => {
    const { title, presentation_limit_date } = props

    return (
        <Section
            title={
                <Header>
                    <h2>{title}</h2>
                    <EnrollButton {...props} />
                </Header>
            }
        >
            <div className="flex">
                <h3>Fecha límite de presentación: </h3>
                <b>
                    {capitalize(DayJs(presentation_limit_date).format("LLLL"))}
                </b>
            </div>

            <Admins {...props} />
        </Section>
    )
}

const Admins = async ({ id }: Pick<Conference, "id">) => {
    const { data } = await getConferenceAdmins({ id })

    if (!data) return null

    return (
        <div>
            <h3>Administradores: </h3>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.users.name}</li>
                ))}
            </ul>
        </div>
    )
}
