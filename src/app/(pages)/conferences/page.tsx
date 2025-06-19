import { Suspense } from "react"
import { MyConferences } from "./components/MyConferences"
import { OtherConferences } from "./components/OtherConferences"
import Styles from "./page.module.css"

export default function Conferences() {
    return (
        <>
            <main className={Styles.main}>
                <h1>Listado de Congresos</h1>
                <p>
                    Explorá los congresos a los que estás inscripto y descubrí
                    nuevas oportunidades para participar como asistente o
                    ponente.
                </p>
            </main>
            <section>
                <Suspense fallback={<span>Cargando...</span>}>
                    <MyConferences />
                </Suspense>
                <OtherConferences />
            </section>
        </>
    )
}
