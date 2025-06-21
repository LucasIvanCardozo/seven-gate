import "./globals.css"

import { Geist, Geist_Mono } from "next/font/google"

import type { Metadata } from "next"
import type { PropsWithChildren } from "react"
import { Nav } from "./components/nav/Nav"
import Providers from "./contexts/Providers"
import { Footer } from "./components/Footer"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Seven Gate's Project",
    description: "Seven Gate's Project",
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Providers>
                    <Nav />
                    <div className="container" id="root">
                        {children}
                    </div>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
