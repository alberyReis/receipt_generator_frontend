import styles from './styles.module.css';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerInputColumn } from '../../components/ContainerInputColumn';
import { InputForm } from '../../components/InputForm';
import { AddIcon } from '../../components/AddIcon';
import { ButtonSubmitForm } from '../../components/ButtonSubmitForm';
import { InputErrorText } from '../../components/InputErrorText';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import type { FormattedCpfCnpj, FormValues, Product } from '../../interfaces/interfaces';
import { validateCpfCnpj } from '../../utils/validateCpfCnpj';
import { ContainerInputRow } from '../../components/ContainerInputRow';

export const FormScreen = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState<string>('Magic Fest');
    const [companyCpfOrCnpj, setCompanyCpfOrCnpj] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [clientCpfOrCnpj, setClientCpfOrCnpj] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const isProductValid = (product: Product): boolean => {
        if (!product.quantity) {
            setErrorMessage('A quantidade do produto não foi preenchida');
            return false;
        }
        if (isNaN(Number(product.quantity))) {
            setErrorMessage('A quantidade aceita apenas números');
            return false;
        }
        if (!product.description) {
            setErrorMessage('O nome do produto não foi preenchido');
            return false;
        }
        if (!isNaN(Number(product.description))) {
            setErrorMessage('O nome aceita apenas texto');
            return false;
        }
        if (product.description.length < 3) {
            setErrorMessage('O nome deve ter ao menos 3 letras');
            return false;
        }
        if (!product.price) {
            setErrorMessage('O preço do produto não foi preenchido');
            return false;
        }
        if (isNaN(Number(product.price.replace(',', '.')))) {
            setErrorMessage('O preço aceita apenas números');
            return false;
        }
        return true;
    };

    const handleAddProduct = () => {
        const newProduct: Product = { quantity, description, price };

        if (!isProductValid(newProduct)) return;

        setErrorMessage('');
        setProducts(prev => [...prev, newProduct]);
        setQuantity('');
        setDescription('');
        setPrice('');
    };

    const isNameValid = (name: string): boolean => {
        const isNumeric = !isNaN(Number(name));

        if (!name) {
            setErrorMessage('O nome não foi preenchido');
            return false;
        }
        if (isNumeric) {
            setErrorMessage('O nome aceita apenas formato de texto');
            return false;
        }
        if (name.length < 5) {
            setErrorMessage('O nome necessita ter ao menos 5 letras');
            return false;
        }
        return true;
    };

    const formatCpfCnpj = (value: string): FormattedCpfCnpj => {
        const { value: sanitized, type, isValid } = validateCpfCnpj(value);

        if (type === 'CPF' && isValid) {
            return {
                formattedValue: sanitized.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'),
                isValid: true
            };
        }

        if (type === 'CNPJ' && isValid) {
            return {
                formattedValue: sanitized.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'),
                isValid: true
            };
        }

        setErrorMessage('CPF ou CNPJ inválido');
        return { formattedValue: '', isValid: false };
    };

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isNameValid(companyName)) return;

        let formattedCompanyCpfCnpj: FormattedCpfCnpj = { formattedValue: "", isValid: true };
        if (companyCpfOrCnpj.trim() !== "") {
            formattedCompanyCpfCnpj = formatCpfCnpj(companyCpfOrCnpj);
            if (!formattedCompanyCpfCnpj.isValid) return;
        }

        if (!isNameValid(clientName)) return;

        const formattedClientCpfCnpj = formatCpfCnpj(clientCpfOrCnpj);
        if (!formattedClientCpfCnpj.isValid) return;

        setErrorMessage('');

        const formattedDate = new Date().toLocaleDateString("pt-BR");
        const currentReceiptNumber = Number(localStorage.getItem("receiptNumber")) || 0;
        const newReceiptNumber = currentReceiptNumber + 1;
        localStorage.setItem("receiptNumber", String(newReceiptNumber));

        const totalPrice = products.reduce((acc, p) => {
            return acc + Number(p.quantity) * Number(p.price?.replace(",", "."));
        }, 0);

        const formValues: FormValues = {
            receiptNumber: newReceiptNumber.toString().padStart(6, '0'),
            formattedDate,
            companyName,
            companyCpfOrCnpj: formattedCompanyCpfCnpj.formattedValue,
            clientName,
            clientCpfOrCnpj: formattedClientCpfCnpj.formattedValue,
            totalProductPrice: totalPrice.toFixed(2).replace('.', ','),
            products,
        };

        setClientName('');
        navigate("/receipter", { state: formValues });
    };


    return (
        <div className={styles.containerFormScreen}>
            <Header />
            <form className={styles.formWrapper} onSubmit={handleSubmitForm}>
                <fieldset className={styles.formFieldset}>
                    <legend className={styles.formLegend}>Preencha e crie seu recibo</legend>
                    <ContainerInputColumn>
                        <InputForm
                            id='companyName'
                            type='select'
                            label='Nome da Empresa'
                            placeholder='Magic Fest'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            options={[
                                { value: "Magic Fest", label: "Magic Fest" },
                                { value: "Luana Santos de Oliveira", label: "Luana Santos de Oliveira" },
                            ]}
                        />
                        <InputForm
                            id='companyCpfOrCnpj'
                            type='text'
                            label='CPF/CNPJ do Empresa'
                            placeholder='000.000.000-00'
                            value={companyCpfOrCnpj}
                            onChange={(e) => setCompanyCpfOrCnpj(e.target.value)}
                        />
                    </ContainerInputColumn>
                    <ContainerInputColumn>
                        <InputForm
                            id='clientName'
                            type='text'
                            label='Nome do Cliente'
                            placeholder='Magic Fest'
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                        <InputForm
                            id='clientCpfOrCnpj'
                            type='text'
                            label='CPF/CNPJ do Cliente'
                            placeholder='000.000.000-00'
                            value={clientCpfOrCnpj}
                            onChange={(e) => setClientCpfOrCnpj(e.target.value)}
                        />
                    </ContainerInputColumn>
                    <ContainerInputRow>
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
                        <div style={{ alignItems: 'center', display: 'flex' }}>
                            <InputForm
                                id='price'
                                type='text'
                                label='Preço do Produto'
                                placeholder='6,00'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <AddIcon onClick={handleAddProduct} />
                        </div>
                    </ContainerInputRow>
                    <InputErrorText textError={errorMessage} />
                    <ButtonSubmitForm />
                </fieldset>
            </form>
            <Footer />
        </div>
    );
};
