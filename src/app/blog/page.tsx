import CreateUser from "../components/createUser"
import Link from "next/link"

export default async function Blog() {
    return (
        <main>
            <h1 className="text-4xl font-bold">Blog</h1>
            <p>Bienvenido al blog Papi.</p>
            <Link
                href="/"
                className="py-1 px-2 bg-blue-900 rounded-sm hover:underline"
            >
                Volver
            </Link>
        </main>
    )
}
