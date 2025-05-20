import FormLogin from "@/app/(pages)/login/components/formLogin"
import { Section } from "@/app/components/Section"

export default async function Login() {
    return (
        <Section title="Login">
            <FormLogin />
        </Section>
    )
}
