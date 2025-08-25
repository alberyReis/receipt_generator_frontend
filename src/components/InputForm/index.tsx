import styles from './styles.module.css'

export const InputForm = () => {
    return (
        <div className={styles.input_form}>
            <label htmlFor="nameClient">Nome do Cliente</label>
            <input
                id='nameClient'
                className={styles.input}
                type="text"
                placeholder='Albery Vieira Reis'
            />
        </div>
    )
}