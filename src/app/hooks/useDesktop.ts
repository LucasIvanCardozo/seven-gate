"use client"

import { useEffect, useState } from "react"

export const useDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)")

        setIsDesktop(mediaQuery.matches)

        const onMediaChange = ({ matches }: MediaQueryListEvent) =>
            setIsDesktop(matches)

        mediaQuery.addEventListener("change", onMediaChange)

        return () => mediaQuery.removeEventListener("change", onMediaChange)
    }, [])

    return {
        isDesktop,
        isMobile: !isDesktop,
    }
}
