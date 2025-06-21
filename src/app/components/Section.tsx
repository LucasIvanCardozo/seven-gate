import { ComponentProps, PropsWithChildren, ReactNode } from "react"
import Styles from "./Section.module.css"

export const Section = ({
    children,
    title,
    id,
    className = "",
    ...rest
}: PropsWithChildren<Props>) => {
    return (
        <section id={id} className={`${Styles.section} ${className}`} {...rest}>
            {typeof title === "string" ? (
                <h2 className={Styles.title}>{title}</h2>
            ) : (
                <div className={Styles.title}>{title}</div>
            )}
            <div className={Styles.content}>{children}</div>
        </section>
    )
}

type Props = Omit<ComponentProps<"section">, "title"> & {
    title: ReactNode
}
