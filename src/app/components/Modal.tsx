"use client"

import React, { ComponentProps, ComponentType, JSX } from "react"
import ReactModal from "react-modal"

ReactModal.setAppElement("#root")

const customStyles: Props["style"] = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "max-content",
        height: "min-content",
        maxWidth: "90%",
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
                <button onClick={() => setIsOpen(false)} >X</button>
                {rest.children}
            </ReactModal>
        </>
    )
}

type Props = Omit<ComponentProps<typeof ReactModal>, "isOpen"> & {
    children: React.ReactNode
    opener: JSX.Element
}
