"use client"

import React, { ComponentProps } from "react"

import { Scanner } from "@yudiel/react-qr-scanner"

export const QrScanner = (props: ComponentProps<typeof Scanner>) => (
    <Scanner {...props} formats={["qr_code"]} />
)
