"use client"

import Link from "next/link"
import Styles from "./Nav.module.css"
import { useState } from "react"
import { useDesktop } from "../hooks/useDesktop"
import { useUser } from "../hooks/useUser"

export const Nav = () => {
    const { isDesktop } = useDesktop()
    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className={Styles.nav}>
            <button
                className={Styles.burger}
                onClick={() => setIsOpen((old) => !old)}
            >
                {isOpen ? "X" : "☰"}
            </button>
            {(isDesktop || isOpen) && (
                <ul>
                    <Link href="/">Inicio</Link>
                    <Link href="/register">Registro</Link>
                    {user ? (
                        <Link href="/profile">{user.name}</Link>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                        </>
                    )}
                    <Link href="/conferences">Congresos</Link>
                </ul>
            )}
        </nav>
    )
}
