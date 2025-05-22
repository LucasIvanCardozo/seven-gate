import { Suspense } from "react"
import { MyConferences } from "./components/MyConferences"
import { OtherConferences } from "./components/OtherConferences"

export default function Conferences() {
    return (
        <section>
            <Suspense fallback={<span>Cargando...</span>}>
                <MyConferences />
            </Suspense>
            <OtherConferences />
        </section>
    )
}
