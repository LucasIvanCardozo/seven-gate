import { useFormStatus } from "react-dom"

export const SubmitButton = ({ title }: { title: string }) => {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending}>
            {pending ? "..." : title}
        </button>
    )
}
