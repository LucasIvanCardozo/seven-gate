import { ComponentProps, ReactNode } from "react"
import { useFormStatus } from "react-dom"

export const SubmitButton = ({ children, disabled, ...rest }: Props) => {
    const { pending } = useFormStatus()

    return (
        <button {...rest} type="submit" disabled={pending || disabled}>
            {pending ? "..." : children}
        </button>
    )
}

type Props = ComponentProps<"button"> & {
    children: ReactNode
}
