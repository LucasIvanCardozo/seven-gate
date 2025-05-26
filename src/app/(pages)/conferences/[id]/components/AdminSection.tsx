import { Section } from "@/app/components/Section"
import { Conference } from "@/app/lib/actions/conferences/get.my.conferences"

export const AdminSection = ({
    id,
    roles,
}: Pick<Conference, "id" | "roles">) => {
    if (!roles?.includes("admin")) return null

    return <Section title="Administración">se vienen cositas</Section>
}
