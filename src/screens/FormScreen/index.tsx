import styles from './styles.module.css'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContainerInput } from '../../components/ContainerInput'
import { InputForm } from '../../components/InputForm'
import { AddIcon } from '../../components/AddIcon'
import { ButtonSubmitForm } from '../../components/ButtonSubmitForm'
import { InputErrorText } from '../../components/InputErrorText'
import { Header } from '../../components/Header'

interface ValidateCpfCnpjResult {
    value: string
    type: 'CPF' | 'CNPJ' | ''
    isValid: boolean
}

interface FormattedCpfCnpj {
    formattedValue: string
    isValid: boolean
}

interface Product {
    quantity: string | undefined
    description: string
    price: string | undefined
}

export interface FormValues {
    receiptNumber: string
    formattedDate: string
    clientName: string
    cpfOrCnpj: string
    totalProductPrice: string
    products: Product[]
}

export const FormScreen = () => {
    const navigate = useNavigate()
    const [clientName, setClientName] = useState<string>('')
    const [cpfOrCnpj, setCpfOrCnpj] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')

    const isClientNameValid = (name: string): boolean => {
        const isNumeric = !isNaN(Number(name))

        if (!name) {
            setErrorMessage('O nome não foi preenchido')
            return false
        }
        if (isNumeric) {
            setErrorMessage('O nome aceita apenas formato de texto')
            return false
        }
        if (name.length < 5) {
            setErrorMessage('O nome necessita ter ao menos 5 letras')
            return false
        }
        return true
    }

    const sanitizeCpfCnpj = (value: string): string => value.replace(/\D/g, "")

    const isValidCpf = (cpf: string): boolean => {
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

        let sum = 0
        for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i)
        let firstCheck = 11 - (sum % 11)
        if (firstCheck >= 10) firstCheck = 0
        if (firstCheck !== parseInt(cpf[9])) return false

        sum = 0
        for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i)
        let secondCheck = 11 - (sum % 11)
        if (secondCheck >= 10) secondCheck = 0

        return secondCheck === parseInt(cpf[10])
    }

    const isValidCnpj = (cnpj: string): boolean => {
        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false

        const calcDigit = (base: string) => {
            const weights = base.length === 12
                ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
                : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

            let sum = 0
            base.split("").forEach((digit, i) => {
                sum += parseInt(digit) * weights[i]
            })

            const result = sum % 11
            return result < 2 ? 0 : 11 - result
        }

        const firstCheck = calcDigit(cnpj.slice(0, 12))
        const secondCheck = calcDigit(cnpj.slice(0, 12) + firstCheck)

        return firstCheck === parseInt(cnpj[12]) && secondCheck === parseInt(cnpj[13])
    }

    const validateCpfCnpj = (value: string): ValidateCpfCnpjResult => {
        const sanitized = sanitizeCpfCnpj(value)

        if (sanitized.length === 11 && isValidCpf(sanitized)) {
            return { value: sanitized, type: 'CPF', isValid: true }
        }

        if (sanitized.length === 14 && isValidCnpj(sanitized)) {
            return { value: sanitized, type: 'CNPJ', isValid: true }
        }

        return { value: '', type: '', isValid: false }
    }

    const formatCpfCnpj = (value: string): FormattedCpfCnpj => {
        const { value: sanitized, type, isValid } = validateCpfCnpj(value)

        if (type === 'CPF' && isValid) {
            return { formattedValue: sanitized.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'), isValid: true }
        }

        if (type === 'CNPJ' && isValid) {
            return { formattedValue: sanitized.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'), isValid: true }
        }

        setErrorMessage('CPF ou CNPJ inválido')
        return { formattedValue: '', isValid: false }
    }

    const isProductValid = (product: Product): boolean => {
        if (!product.quantity) {
            setErrorMessage('A quantidade do produto não foi preenchida')
            return false
        }
        if (isNaN(Number(product.quantity))) {
            setErrorMessage('A quantidade aceita apenas números')
            return false
        }
        if (!product.description) {
            setErrorMessage('O nome do produto não foi preenchido')
            return false
        }
        if (!isNaN(Number(product.description))) {
            setErrorMessage('O nome aceita apenas texto')
            return false
        }
        if (product.description.length < 3) {
            setErrorMessage('O nome deve ter ao menos 3 letras')
            return false
        }
        if (!product.price) {
            setErrorMessage('O preço do produto não foi preenchido')
            return false
        }
        if (isNaN(Number(product.price.replace(',', '.')))) {
            setErrorMessage('O preço aceita apenas números')
            return false
        }
        return true
    }

    const handleAddProduct = () => {
        const newProduct: Product = { quantity, description, price }

        if (!isProductValid(newProduct)) return

        setErrorMessage('')
        setProducts(prev => [...prev, newProduct])
        setQuantity('')
        setDescription('')
        setPrice('')
    }

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isClientNameValid(clientName)) return
        const formattedCpfCnpj = formatCpfCnpj(cpfOrCnpj)
        if (!formattedCpfCnpj.isValid) return

        setErrorMessage('')

        const formattedDate = new Date().toLocaleDateString("pt-BR")
        const currentReceiptNumber = Number(localStorage.getItem("receiptNumber")) || 0
        const newReceiptNumber = currentReceiptNumber + 1
        localStorage.setItem("receiptNumber", String(newReceiptNumber))

        const totalPrice = products.reduce((acc, p) => {
            return acc + Number(p.quantity) * Number(p.price?.replace(",", "."))
        }, 0)

        const formValues: FormValues = {
            receiptNumber: newReceiptNumber.toString().padStart(4, '0'),
            formattedDate,
            clientName,
            cpfOrCnpj: formattedCpfCnpj.formattedValue,
            totalProductPrice: totalPrice.toFixed(2),
            products,
        }

        setClientName('')
        navigate("/receipter", { state: formValues })
    }

    return (
        <div>
            <Header />
            <div className={styles.containerFormScreen}>
                <form className={styles.formWrapper} onSubmit={handleSubmitForm}>
                    <fieldset className={styles.formFieldset}>
                        <legend className={styles.formLegend}>Preencha e crie seu recibo</legend>
                        <ContainerInput>
                            <InputForm
                                id='clientName'
                                type='text'
                                label='Nome do Cliente'
                                placeholder='Fraldinhas'
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                            />
                            <InputForm
                                id='cpfOrCnpj'
                                type='text'
                                label='CPF/CNPJ do Cliente'
                                placeholder='000.000.000-41'
                                value={cpfOrCnpj}
                                onChange={(e) => setCpfOrCnpj(e.target.value)}
                            />
                        </ContainerInput>
                        <ContainerInput>
                            <InputForm
                                id='quantity'
                                type='text'
                                label='Quantidade do Produto'
                                placeholder='1'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <InputForm
                                id='description'
                                type='text'
                                label='Nome do Produto'
                                placeholder='Caixa Sextavada'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <InputForm
                                id='price'
                                type='text'
                                label='Preço do Produto'
                                placeholder='6,00'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <AddIcon onClick={handleAddProduct} />
                        </ContainerInput>
                        <InputErrorText textError={errorMessage} />
                        <ButtonSubmitForm />
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
