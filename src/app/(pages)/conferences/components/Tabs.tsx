"use client"

import { ReactNode, useState } from "react"

export const Tabs = <T extends string>({ tabs }: Props<T>) => {
    const [view, setView] = useState(tabs[0].label)

    const tab = tabs.find(({ label }) => label === view)
    if (!tab) return null

    return (
        <>
            <div role="group" className="slim">
                {tabs.map(({ label }) => (
                    <button
                        key={label}
                        onClick={() => setView(label)}
                        className={view === label ? "active" : ""}
                        title={label}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {tab.component}
        </>
    )
}

interface Props<T extends string> {
    tabs: {
        label: string
        component: ReactNode
    }[]
}
