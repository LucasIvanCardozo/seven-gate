import type { Conference as ConferenceType } from "@/app/lib/conferences/get.my.conferences"
import { EnrollButton } from "./enroll/EnrollButton"
import { UnEnrollButton } from "./unenroll/UnEnrollButton"
import Link from "next/link"

export const Conference = (props: ConferenceType) => {
    const { id, title } = props

    return (
        <article className="card egg-lead">
            <h3>{title}</h3>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Roles {...props} />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <UnEnrollButton {...props} />
                    <EnrollButton {...props} />
                    <Link
                        className="button outlined"
                        href={`/conferences/${id}`}
                    >
                        Ver +
                    </Link>
                </div>
            </div>
        </article>
    )
}

const Roles = ({ roles }: Pick<ConferenceType, "roles">) =>
    !!roles?.length && (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                {roles.map((item) => (
                    <span key={item} className="tag white">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    )
