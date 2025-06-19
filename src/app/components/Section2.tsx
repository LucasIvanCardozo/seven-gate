import { Section } from "./Section"
import Styles from "./Section2.module.css"
export const Section2 = () => {
    return (
        <Section title="Participación abierta" className={Styles.section}>
            <div className={Styles.users}>
                <p>
                    Cualquier usuario puede registrarse en nuestra plataforma,
                    lo que le permitirá:
                </p>
                <ul>
                    <li>
                        Inscribirse como <strong>asistente</strong> a futuros
                        congresos.
                    </li>
                    <li>
                        Postularse como <strong>ponente</strong> subiendo su
                        ponencia.
                    </li>
                    <li>
                        Recibir una <strong>evaluación</strong> y, si es
                        aprobada, exponer en el evento.
                    </li>
                </ul>
            </div>
        </Section>
    )
}
