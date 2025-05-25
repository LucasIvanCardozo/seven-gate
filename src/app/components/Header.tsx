import { PropsWithChildren } from "react"

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {children}
        </header>
    )
}
