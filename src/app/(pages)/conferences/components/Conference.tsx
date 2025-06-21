"use server"

import type {
    Conference as ConferenceType,
    Role,
} from "@/app/lib/actions/conferences/get.my.conferences"
import { EnrollButton } from "./enroll/EnrollButton"
import { UnEnrollButton } from "./unenroll/UnEnrollButton"
import { DayJs } from "@/app/utils/DayJs"
import Styles from "./Conference.module.css"
import { getConference } from "@/app/lib/actions/conferences/get.conference"
import { GoConference } from "./GoConference"
import { RoleWithIcon } from "./RoleWithIcon"

export const Conference = async ({ id }: Pick<ConferenceType, "id">) => {
    const { data } = await getConference({ id })
    if (!data) return null

    const { title, presentation_limit_date, roles } = data

    return (
        <article className={`${Styles.container} card egg-lead`}>
            <header className={Styles.header}>
                <h3>{title}</h3>
                <span>
                    {DayJs(presentation_limit_date).format("DD/MM/YYYY")}
                </span>
            </header>
            <Roles roles={roles} />

            <div className={Styles.actions}>
                <UnEnrollButton id={id} />
                <EnrollButton id={id} />
                <GoConference id={id} />
            </div>
        </article>
    )
}

const Roles = ({ roles }: Pick<ConferenceType, "roles">) =>
    !!roles?.length && (
        <div className={`${Styles.roles} card white`}>
            <h4>Tus Roles:</h4>
            {roles.map((role) => (
                <RoleWithIcon role={role} key={role} />
            ))}
        </div>
    )
