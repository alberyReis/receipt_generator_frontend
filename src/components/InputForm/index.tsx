import styles from './styles.module.css'
import type { ChangeEvent } from 'react'

interface IInputForm {
    id: string
    label: string
    type: 'text' | 'number' | 'select'
    placeholder?: string
    value: string | number | undefined
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    options?: { value: string; label: string }[]
}

export const InputForm = (props: IInputForm) => {
    return (
        <div className={styles.input_form}>
            <label htmlFor={props.id}>{props.label}</label>

            {props.type === 'select' ? (
                <select
                    id={props.id}
                    className={styles.input}
                    value={props.value}
                    onChange={props.onChange}
                >
                    {props.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={props.id}
                    className={styles.input}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
            )}
        </div>
    )
}
