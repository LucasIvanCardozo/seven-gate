"use server"

import type {
    Conference as ConferenceType,
    Role,
} from "@/app/lib/actions/conferences/get.my.conferences"
import { EnrollButton } from "./enroll/EnrollButton"
import { UnEnrollButton } from "./unenroll/UnEnrollButton"
import Link from "next/link"
import { DayJs } from "@/app/utils/DayJs"
import Styles from "./Conference.module.css"
import {
    Admin,
    Evaluator,
    Listener,
    Speaker,
} from "@/app/assets/icons/react-icons"
import { ReactNode } from "react"
import { getConference } from "@/app/lib/actions/conferences/get.conference"

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
                <button>
                    <Link className="outlined" href={`/conferences/${id}`}>
                        Ver +
                    </Link>
                </button>
            </div>
        </article>
    )
}

const Roles = ({ roles }: Pick<ConferenceType, "roles">) =>
    !!roles?.length && (
        <div className={`${Styles.roles} card white`}>
            <h4>Tus Roles</h4>
            {roles.map((role) => (
                <span key={role} className={`${Styles.role}`}>
                    {RoleIcon[role]}
                    {role}
                </span>
            ))}
        </div>
    )

const RoleIcon: Record<Role, ReactNode> = {
    admin: <Admin />,
    evaluador: <Evaluator />,
    ponente: <Speaker />,
    oyente: <Listener />,
}
