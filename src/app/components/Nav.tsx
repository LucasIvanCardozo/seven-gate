"use client"

import Link from "next/link"
import Styles from "./Nav.module.css"
import { useState } from "react"
import { useDesktop } from "../hooks/useDesktop"
import { useUser } from "../hooks/useUser"
import { Burger, Close } from "../assets/icons/react-icons"
import Image from "next/image"
import Sevengate from "../assets/images/sevenGate.png"
import { useRouter } from "next/navigation"
export const Nav = () => {
    const { isDesktop } = useDesktop()
    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()
    const closeMenu = () => setIsOpen(false)

    return (
        <>
            <div className={Styles.burgerContainer}>
                <Image
                    className={Styles.logo}
                    src={Sevengate}
                    alt="Seven Gate"
                    width={89}
                    height={41}
                    onClick={() => {
                        closeMenu()
                        router.push("/")
                    }}
                />
                <button
                    className={Styles.burger}
                    onClick={() => setIsOpen((old) => !old)}
                >
                    {isOpen ? <Close /> : <Burger />}
                </button>
            </div>
            <nav
                className={`${Styles.nav} ${isDesktop || isOpen ? Styles.open : Styles.closed}`}
            >
                <ul className={Styles.navMenu}>
                    <Link href="/" onClick={closeMenu}>
                        Inicio
                    </Link>
                    <Link href="/register" onClick={closeMenu}>
                        Registro
                    </Link>
                    {user ? (
                        <Link href="/profile" onClick={closeMenu}>
                            {user.name}
                        </Link>
                    ) : (
                        <Link href="/login" onClick={closeMenu}>
                            Login
                        </Link>
                    )}
                    <Link href="/conferences" onClick={closeMenu}>
                        Congresos
                    </Link>
                </ul>
            </nav>
        </>
    )
}
