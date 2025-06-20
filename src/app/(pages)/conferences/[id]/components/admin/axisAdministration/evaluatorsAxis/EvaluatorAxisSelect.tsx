"use client"

import { AxisDTO } from "@/app/lib/actions/axis/get.axis.by.conference"
import React, { useMemo, useState } from "react"

export const EvaluatorAxisSelect = ({
    axis,
    children,
}: {
    axis: AxisDTO[]
    children: React.ReactNode[]
}) => {
    const [id, setId] = useState<number | null>(null)

    const childrenArray = React.Children.toArray(children)
    const activeChild = childrenArray.find((child: any) => {
        // @ts-ignore
        return child.props.id == id
    })

    return (
        <>
            <select
                value={id ?? ""}
                onChange={({ target: { value } }) =>
                    !isNaN(+value) && setId(+value)
                }
            >
                <option hidden disabled value="">
                    Eliga un eje
                </option>
                {axis.map(({ id, title }) => (
                    <option key={id} value={id}>
                        {title}
                    </option>
                ))}
            </select>
            {activeChild}
        </>
    )
}
