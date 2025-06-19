import { Section } from "./Section"
import Styles from "./Welcome.module.css"

export const Welcome = () => {
    return (
        <Section title="Bienvenido a Seven Gate">
            <div className={Styles.container}>
                <p className={Styles.subtitle}>
                    La plataforma integral para la organización de congresos.
                </p>

                <div className={Styles.intro}>
                    <p>
                        En <strong>Seven Gate</strong> facilitamos la gestión
                        completa de congresos. Nuestra plataforma permite a los
                        administradores:
                    </p>
                    <ul className={Styles.featuresList}>
                        <li>
                            Crear y gestionar <strong>ejes temáticos</strong>.
                        </li>
                        <li>
                            Generar y distribuir{" "}
                            <strong>circulares informativas</strong>.
                        </li>
                        <li>
                            Emitir <strong>certificados</strong> para asistentes
                            y participantes.
                        </li>
                        <li>
                            Asignar y administrar <strong>roles</strong>:
                            asistentes, ponentes, evaluadores y administradores.
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    )
}
