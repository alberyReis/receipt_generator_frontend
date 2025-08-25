import styles from './styles.module.css'
import { ContainerInput } from '../../components/ContainerInput'
import { InputForm } from '../../components/InputForm'
import { AddIcon } from '../../components/AddIcon'
import { ButtonSubmitForm } from '../../components/ButtonSubmitForm'

export const FormScreen = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <fieldset>
                    <legend>Preencha e crie seu recibo</legend>
                    <ContainerInput>
                        <InputForm />
                        <InputForm />
                    </ContainerInput>
                    <ContainerInput>
                        <InputForm />
                        <InputForm />
                        <InputForm />
                        <AddIcon />
                    </ContainerInput>
                    <ButtonSubmitForm />
                </fieldset>
            </form>
        </div>
    )
}