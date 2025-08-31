import styles from './styles.module.css'

export const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.title}>Gerador de Recibo</div>
            <img src="../../../public/assets/images/logo_mg.png" alt="Logo da Magic Fest" width='80px' />
        </header>
    )
}