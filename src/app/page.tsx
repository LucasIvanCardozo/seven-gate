import { MainHome } from "./components/MainHome"
import { Welcome } from "./components/Welcome"
import { OpenParticipation } from "./components/OpenParticipation"
import { CreateConference } from "./components/CreateConference"

export default function Home() {
    return (
        <>
            <MainHome />
            <Welcome />
            <OpenParticipation />
            <CreateConference />
        </>
    )
}
