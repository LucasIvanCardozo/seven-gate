"use client"

import React, { ComponentProps, ComponentType, JSX } from "react"
import ReactModal from "react-modal"
import Styles from "./Modal.module.css"
import { Header } from "./Header"
import { Close } from "../assets/icons/react-icons"

ReactModal.setAppElement("#root")

const customStyles: Props["style"] = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "85%",
        padding: "0.5rem",
        height: "min-content",
        maxWidth: "450px",
        position: "relative",
        borderRadius: "1rem",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
}

export const Modal = ({ opener, ...rest }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            {React.cloneElement(opener, { onClick: () => setIsOpen(true) })}
            <ReactModal isOpen={isOpen} {...rest} style={customStyles}>
                <Header>
                    <span></span>
                    <button
                        className={Styles.close}
                        onClick={() => setIsOpen(false)}
                    >
                        <Close />
                    </button>
                </Header>
                {rest.children}
            </ReactModal>
        </>
    )
}

type Props = Omit<ComponentProps<typeof ReactModal>, "isOpen"> & {
    children: React.ReactNode
    opener: JSX.Element
}
