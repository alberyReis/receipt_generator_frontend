import styles from './styles.module.css'
import { type ReactNode } from 'react'

interface IContainerInputProps {
    children: ReactNode
}

export const ContainerInput = ({children}:IContainerInputProps) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}