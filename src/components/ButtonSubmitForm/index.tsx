import styles from './styles.module.css';

export const ButtonSubmitForm = () => {
    return (
        <input
            className={styles.subimt}
            type="submit"
            value='Criar'
        />
    );
};