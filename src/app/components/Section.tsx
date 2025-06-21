import { ComponentProps, PropsWithChildren, ReactNode } from "react"
import Styles from "./Section.module.css"

export const Section = ({
    children,
    title,
    id,
    className,
    ...rest
}: PropsWithChildren<Props>) => {
    return (
        <section id={id} className={`${Styles.section} ${className}`} {...rest}>
            {typeof title === "string" ? <h2>{title}</h2> : title}
            {children}
        </section>
    )
}

type Props = Omit<ComponentProps<"section">, "title"> & {
    title: ReactNode
}
