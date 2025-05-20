import FormRegister from "@/app/(pages)/register/components/formRegister"
import { Section } from "@/app/components/Section"

export default async function Register() {
    return (
        <Section title="Registro">
            <FormRegister />
        </Section>
    )
}
