"use client"

import React, { useState } from "react"

export default function Users() {
    const [name, setName] = useState("Juan")

    return (
        <div>
            Users page
            <h1>hola {name}</h1>
            <button
                onClick={() => {
                    setName("Agustin")
                }}
            >
                Click me
            </button>
        </div>
    )
}
