import { Suspense } from "react"
import { MyConferences } from "./components/MyConferences"
import { OtherConferences } from "./components/OtherConferences"

export default function Conferences() {
    return (
        <section>
            <Suspense fallback={<h1>(fallback)</h1>}>
                <MyConferences />
            </Suspense>
            <OtherConferences />
        </section>
    )
}
