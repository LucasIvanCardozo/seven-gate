import type { Conference as ConferenceType } from "@/app/lib/conferences/get.my.conferences"
import { EnrollButton } from "./enroll/EnrollButton"
import { UnEnrollButton } from "./UnEnrollButton"

export const Conference = (props: ConferenceType) => {
    const { title, roles } = props

    return (
        <article className="card egg-lead">
            <h3>{title}</h3>

            {roles?.length ? (
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
                    <UnEnrollButton {...props} />
                </div>
            ) : (
                <EnrollButton {...props} />
            )}
        </article>
    )
}
