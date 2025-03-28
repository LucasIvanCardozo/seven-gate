import CreateUser from "./components/createUser"
import Link from "next/link"

export default function Home() {
    return (
        <>
            <main>
                <h1 className="text-4xl font-bold">Home</h1>
                <p>Esta es la pagina principal</p>
                <Link
                    className="py-1 px-2 bg-blue-900 rounded-sm hover:underline"
                    href="/blog"
                >
                    Ir al Blog
                </Link>
            </main>
            <section>
                <CreateUser />
            </section>
        </>
    )
}
