import { PropsWithChildren } from "react"

export const Grid = ({ children }: PropsWithChildren) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 300px))",
            gap: 10,
            padding: "0.4rem",
            justifyContent: "center",
        }}
    >
        {children}
    </div>
)
