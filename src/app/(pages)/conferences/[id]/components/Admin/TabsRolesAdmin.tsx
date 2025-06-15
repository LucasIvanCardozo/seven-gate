"use client"

import { ReactNode, useState } from "react"

export const TabsRolesAdmin = ({ children }: { children: React.ReactNode }) => {
    const [view, setView] = useState<View>("new")

    const [newRoleForm, deleteRoleForm] = children as ReactNode[]

    return (
        <>
            <div role="group" className="slim">
                <button
                    onClick={() => setView("new")}
                    className={view === "new" ? "active" : ""}
                    title="Nuevo"
                >
                    Nuevo
                </button>
                <button
                    onClick={() => setView("delete")}
                    className={view === "delete" ? "active" : ""}
                    title="Eliminar"
                >
                    Eliminar
                </button>
            </div>

            {view === "new" ? newRoleForm : deleteRoleForm}
        </>
    )
}

type View = "new" | "delete"
