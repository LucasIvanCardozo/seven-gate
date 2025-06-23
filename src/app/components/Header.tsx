import { ComponentProps, PropsWithChildren } from "react"

export const Header = ({
    children,
    style,

    ...rest
}: PropsWithChildren<ComponentProps<"header">>) => {
    return (
        <header
            {...rest}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                ...style,
            }}
        >
            {children}
        </header>
    )
}
