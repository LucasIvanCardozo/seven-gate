import {
    Admin,
    Evaluator,
    Speaker,
    Listener,
} from "@/app/assets/icons/react-icons"
import { Role } from "@/app/lib/actions/conferences/get.my.conferences"
import { ReactNode } from "react"
import Styles from "./RoleWithIcon.module.css"

export const RoleWithIcon = ({ role }: { role: Role }) => {
    return (
        <span key={role} className={`${Styles.role}`}>
            {RoleIcon[role]}
            {role.toUpperCase()}
        </span>
    )
}

const RoleIcon: Record<Role, ReactNode> = {
    admin: <Admin />,
    evaluador: <Evaluator />,
    ponente: <Speaker />,
    oyente: <Listener />,
}
