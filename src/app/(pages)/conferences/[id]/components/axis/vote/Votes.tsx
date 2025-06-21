"use client"

import { Chart } from "react-charts"

export const Votes = () => {
    const data = [
        {
            label: "Votos por ponencia",
            data: [
                { primary: "Ponencia A", secondary: 12 },
                { primary: "Ponencia B", secondary: 8 },
                { primary: "Ponencia C", secondary: 20 },
                { primary: "Ponencia D", secondary: 5 },
                { primary: "Ponencia E", secondary: 12 },
                { primary: "Ponencia F", secondary: 5 },
            ],
        },
    ]

    const primaryAxis = {
        getValue: (datum: any) => datum.primary,
    }

    const secondaryAxes = [
        {
            getValue: (datum: any) => datum.secondary,
        },
    ]

    return (
        <div style={{ width: "100%", height: "100px" }}>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                    tooltip: false,
                    dark: false, // podés activar dark mode si querés
                    initialWidth: 600,
                    initialHeight: 400,
                    interactionMode: "closest",
                }}
            />
        </div>
    )
}
