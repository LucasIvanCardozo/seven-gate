import Styles from "./MainHome.module.css"

export const MainHome = () => {
    return (
        <main className={Styles.main}>
            <div className={Styles.overlay}>
                <section className={Styles.hero}>
                    <h1>
                        Organizá tu congreso de forma profesional y sencilla
                    </h1>
                    <p>
                        La plataforma que conecta organizadores, participantes y
                        conocimiento
                    </p>
                    <button className={Styles.cta}>Crear congreso</button>
                </section>
            </div>
        </main>
    )
}
