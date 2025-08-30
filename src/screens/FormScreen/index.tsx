import styles from './styles.module.css'
import { ContainerInput } from '../../components/ContainerInput'
import { InputForm } from '../../components/InputForm'
import { AddIcon } from '../../components/AddIcon'
import { ButtonSubmitForm } from '../../components/ButtonSubmitForm'
import { useEffect, useState, type FormEvent } from 'react'
import { InputErrorText } from '../../components/InputErrorText'
import { useNavigate } from 'react-router-dom'

interface IProductList {
    productQuantity: string | undefined
    productDescripition: string
    productPrice: string | undefined
}

export interface IFormValues {
    receiptNumber: number,
    formattedDate: string,
    clientName: string,
    totalProductPrice: string,
    productList: IProductList[]
}

export const FormScreen = () => {
    const navigate = useNavigate()
    const [clientName, setClientName] = useState<string>('')
    const [productQuantity, setproductQuantity] = useState<string>('')
    const [productDescripition, setProductDescription] = useState<string>('')
    const [productPrice, setProductPrice] = useState<string>('')
    const [productList, setProductList] = useState<IProductList[]>([])
    const [textError, setTextError] = useState<string>('')

    const clientNameIsValid = (text: any): boolean => {
        const num = Number(text)

        if (text === '') {
            setTextError('O nome não foi preenchido')
            return false
        }

        if (!isNaN(num)) {
            setTextError('O nome aceita apenas formato de texto')
            return false
        }

        if (text?.length <= 5) {
            setTextError('O nome necessita ter ao menos 5 letras')
            return false
        }

        return true
    }

    const productIsValid = (product: any): boolean => {
        if (product.productQuantity === '') {
            setTextError('A quantidade do produto não foi preenchido')
            return false
        }

        if (isNaN(Number(product.productQuantity))) {
            setTextError('A quantidade do produto aceita apenas numeros')
            return false
        }

        if (product.productDescripition === '') {
            setTextError('O nome do produto não foi preenchido')
            return false
        }

        if (!isNaN(Number(product.productDescripition))) {
            setTextError('O nome do produto aceita apenas formato de texto')
            return false
        }

        if (product.productDescripition.length <= 3) {
            setTextError('O nome do produto necessita ter ao menos 3 letras')
            return false
        }

        if (product.productPrice === '') {
            setTextError('O preço do produto não foi preenchido')
            return false
        }

        if (isNaN(Number(product.productPrice.replace(',', '.')))) {
            setTextError('O preço do produto aceita apenas numeros')
            return false
        }

        return true
    }

    const getProductValues = (): IProductList => {
        const products = {
            productQuantity: productQuantity,
            productDescripition: productDescripition,
            productPrice: productPrice,
        }

        return products
    }

    const addProductToList = () => {
        const product = getProductValues()

        if (!productIsValid(product)) {
            return
        }

        setTextError('')

        setProductList((prev => [...prev, product]))

        setproductQuantity('')
        setProductDescription('')
        setProductPrice('')
    }

    const getValuesForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!clientNameIsValid(clientName)) {
            return
        }

        setTextError('')

        const formattedDate = new Date().toLocaleDateString("pt-BR")

        const currentNumberReceipt = Number(localStorage.getItem("receiptNumber")) || 0
        const receiptNumber = currentNumberReceipt + 1
        localStorage.setItem("receiptNumber", String(receiptNumber))

        const totalProductPrice = productList.reduce((acc, product) => {
            const productQuantity = Number(product.productQuantity)
            const productPrice = Number(product.productPrice?.replace(",", "."))
            return acc + productQuantity * productPrice
        }, 0)

        const formValues: IFormValues = {
            receiptNumber: receiptNumber,
            formattedDate: formattedDate,
            clientName: clientName,
            totalProductPrice: totalProductPrice.toFixed(2),
            productList: productList,
        }

        setClientName('')

        navigate("/receipter", { state: formValues })
    }

    useEffect(() => {
        console.log(productList)
    }, [productList])

    return (
        <div className={styles.container}>
            <form
                className={styles.form}
                onSubmit={(e: FormEvent<HTMLFormElement>) => getValuesForm(e)}
            >
                <fieldset>
                    <legend>Preencha e crie seu recibo</legend>
                    <ContainerInput>
                        <InputForm
                            id='clientName'
                            type='text'
                            label='Nome do Cliente'
                            placeholder='Fraldinhas'
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                    </ContainerInput>
                    <ContainerInput>
                        <InputForm
                            id='productQuantity'
                            type='text'
                            label='Quantidade do Produto'
                            placeholder='1'
                            value={productQuantity}
                            onChange={(e) => setproductQuantity(e.target.value)}
                        />
                        <InputForm
                            id='productDescripition'
                            type='text'
                            label='Nome do Produto'
                            placeholder='Caixa Sextavada'
                            value={productDescripition}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                        <InputForm
                            id='productPrice'
                            type='text'
                            label='Preço do Produto'
                            placeholder='6,00'
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <AddIcon onClick={addProductToList} />
                    </ContainerInput>
                    <InputErrorText textError={textError} />
                    <ButtonSubmitForm />
                </fieldset>
            </form>
        </div>
    )
}