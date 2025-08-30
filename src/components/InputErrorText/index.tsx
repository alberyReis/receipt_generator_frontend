import styles from './styles.module.css'

interface IInputErrorTextProps {
    textError: string
}

export const InputErrorText = (props: IInputErrorTextProps) => {
    return (
        <p className={styles.textError}>{props.textError}</p>
    )
}