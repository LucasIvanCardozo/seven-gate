"use client"
import { Chart } from "react-charts"

export const VotesCharts = ({ data }: any) => {
    const primaryAxis = {
        getValue: (datum: any) => datum.primary,
    }

    const secondaryAxes = [
        {
            getValue: (datum: any) => datum.secondary,
            min: 0,
        },
    ]
    return (
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
                tooltip: false,
                dark: false,
                initialWidth: 600,
                initialHeight: 400,
                interactionMode: "closest",
            }}
        />
    )
}
