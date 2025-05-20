import { PropsWithChildren } from "react";

export const Grid = ({ children }: PropsWithChildren) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: 20,
            padding: "20px 10px",
        }}
    >
        {children}
    </div>
)
