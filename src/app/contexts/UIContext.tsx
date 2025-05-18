"use client"

import { createContext, PropsWithChildren, use } from "react"
import { Toaster, toast } from "react-hot-toast"

export const UIContext = createContext({} as UIContextValues)
UIContext.displayName = "UIContext"

export const UIProvider = ({ children }: PropsWithChildren) => {
    const showToast = toast

    return (
        <UIContext.Provider value={{ showToast }}>
            <Toaster />
            {children}
        </UIContext.Provider>
    )
}

export const useUI = () => {
    const context = use(UIContext)

    if (!context) throw new Error("useUI must be used within UIProvider")

    return context
}

interface UIContextValues {
    showToast: typeof toast
}
