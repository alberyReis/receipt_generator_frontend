import styles from './styles.module.css'

interface IAddIconProps {
    onClick: () => void
}

export const AddIcon = (props: IAddIconProps) => {
    return (
        <div className={styles.img}>
            <img
                onClick={props.onClick}
                src='../../../public/assets/images/add.png'
                width='32px'
            />
        </div>
    )
}