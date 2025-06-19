import { PropsWithChildren } from "react"

export const Grid = ({ children }: PropsWithChildren) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 300px))",
            gap: 20,
            padding: "10px 10px",
        }}
    >
        {children}
    </div>
)
