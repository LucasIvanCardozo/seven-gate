import { CreateEmailOptions, Resend } from "resend"

const { RESEND_API_KEY } = process.env
if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is missing!")

const resend = new Resend(RESEND_API_KEY)

export const sendEmail = (props: SendEmailProps) =>
    resend.emails
        .send({
            from: "onboarding@resend.dev",
            ...props,
        })
        .then(({ data, error }) =>
            error
                ? console.error(error.message)
                : console.log(
                      `Email sent to [${props.to}] with response id: ${data?.id}`,
                  ),
        )

type SendEmailProps = Omit<CreateEmailOptions, "from" | "html"> & {
    html: string
}
