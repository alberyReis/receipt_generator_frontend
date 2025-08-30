import styles from './styles.module.css'
import type { ChangeEvent } from 'react'

interface IInputForm {
    id: string
    label: string
    type: string
    placeholder: string
    value: string | number | undefined
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputForm = (props: IInputForm) => {
    return (
        <div className={styles.input_form}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                className={styles.input}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}