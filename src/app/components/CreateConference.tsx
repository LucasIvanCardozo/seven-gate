import { Section } from "./Section"

export const CreateConference = () => {
    return (
        <Section id="create-conference" title="Crea tu congreso">
            <p>
                Si deseás <strong>organizar tu propio congreso</strong> en
                nuestra plataforma, te invitamos a{" "}
                <strong>ponerte en contacto con nosotros</strong> vía correo
                electrónico a{" "}
                <a href="mailto:SevenGateProject@outlook.com">
                    SevenGateProject@outlook.com
                </a>
                .
            </p>
            <p>
                Para iniciar el proceso, necesitaremos que nos envíes la
                siguiente información:
            </p>
            <ul>
                <li>
                    <strong>Nombre del congreso</strong>
                </li>
                <li>
                    <strong>Logo del evento</strong> (imagen)
                </li>
                <li>
                    <strong>Fecha de inicio</strong>
                </li>
                <li>
                    <strong>Correo electrónico</strong> de la cuenta previamente
                    registrada en nuestra plataforma
                </li>
            </ul>
            <p>
                Una vez recibido y verificado el contenido,{" "}
                <strong>habilitaremos tu congreso</strong> con los datos
                proporcionados y te asignaremos el rol de{" "}
                <strong>administrador</strong>.
            </p>
            <p>
                Como administrador tendrás acceso a{" "}
                <strong>funcionalidades exclusivas</strong>: creación de ejes
                temáticos, asignación de roles a otros usuarios, gestión de
                actividades y mucho más.
            </p>
        </Section>
    )
}
