import styles from "./Footer.module.css"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p className={styles.brand}>Seven Gate</p>

                <a
                    href="https://wa.me/5492235319564"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                >
                    Contactanos por WhatsApp
                </a>

                <p className={styles.copy}>
                    &copy; {new Date().getFullYear()} Seven Gate. Todos los
                    derechos reservados.
                </p>
            </div>
        </footer>
    )
}
