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
import { ContainerInputRow } from '../../components/ContainerInputRow';
import type { FormValues, Product } from '../../interfaces/interfaces';
import { validateCpfCnpj } from '../../utils/validateCpfCnpj';
import { sanitizeCpfCnpj } from '../../utils/sanitizeCpfCnpj';
import { formatCpfCnpj } from '../../utils/formatCpfCnpj';

const formDataReset = {
    receiptNumber: '',
    formattedDate: '',
    companyName: 'Magic Fest',
    companyCpfOrCnpj: '',
    clientName: '',
    clientCpfOrCnpj: '',
    totalProductPrice: '0,00',
    products: []
}

const productReset = {
    quantity: '',
    description: '',
    price: ''
}

export const FormScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormValues>(formDataReset);
    const [newProduct, setNewProduct] = useState<Product>(productReset);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const isProductValid = (product: Product): boolean => {
        if (!product.quantity) {
            return setErrorMessage('A quantidade do produto não foi preenchida'), false;
        }
        if (isNaN(Number(product.quantity))) {
            return setErrorMessage('A quantidade aceita apenas números'), false;
        }
        if (!product.description) {
            return setErrorMessage('O nome do produto não foi preenchido'), false;
        }
        if (!isNaN(Number(product.description))) {
            return setErrorMessage('O nome aceita apenas texto'), false;
        }
        if (product.description.length < 3) {
            return setErrorMessage('O nome deve ter ao menos 3 letras'), false;
        }
        if (!product.price) {
            return setErrorMessage('O preço do produto não foi preenchido'), false;
        }
        if (isNaN(Number(product.price.replace(',', '.')))) {
            return setErrorMessage('O preço aceita apenas números'), false;
        }
        return true;
    };

    const handleAddProduct = () => {
        if (!isProductValid(newProduct)) return;

        const updatedProducts = [...formData.products, newProduct];
        const totalPrice = updatedProducts.reduce(
            (acc, product) => acc + Number(product.quantity) * Number(product.price),
            0
        );

        setFormData(prev => ({
            ...prev,
            products: updatedProducts,
            totalProductPrice: totalPrice.toString()
        }));

        setNewProduct(productReset);
        setErrorMessage('');
    };

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.companyName) return setErrorMessage('O nome da empresa não foi preenchido');

        let formattedCompanyCpfCnpj = ''

        if (formData.companyCpfOrCnpj) {
            const sanitizedCompany = sanitizeCpfCnpj(formData.companyCpfOrCnpj || '')
            const companyValidation = validateCpfCnpj(sanitizedCompany)
            if (!companyValidation.isValid) {
                return setErrorMessage('CPF/CNPJ da empresa inválido')
            }
            formattedCompanyCpfCnpj = formatCpfCnpj(sanitizedCompany)
        }

        if (!formData.clientName) return setErrorMessage('O nome do cliente não foi preenchido');

        const sanitizedClient = sanitizeCpfCnpj(formData.clientCpfOrCnpj || '')
        const clientValidation = validateCpfCnpj(sanitizedClient)
        if (!clientValidation.isValid) {
            return setErrorMessage('CPF/CNPJ do cliente inválido')
        }
        const formattedClientCpfCnpj = formatCpfCnpj(sanitizedClient)

        const formattedDate = new Date().toLocaleDateString('pt-BR');

        const currentReceiptNumber = Number(localStorage.getItem('receiptNumber')) || 0;
        const newReceiptNumber = currentReceiptNumber + 1;
        localStorage.setItem('receiptNumber', String(newReceiptNumber));

        const finalForm: FormValues = {
            ...formData,
            formattedDate,
            receiptNumber: newReceiptNumber.toString().padStart(6, '0'),
            companyCpfOrCnpj: formattedCompanyCpfCnpj,
            clientCpfOrCnpj: formattedClientCpfCnpj
        };

        setFormData(formDataReset);

        navigate('/receipter', { state: finalForm });
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
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            options={[
                                { value: 'Magic Fest', label: 'Magic Fest' },
                                { value: 'Luana Santos de Oliveira', label: 'Luana Santos de Oliveira' },
                            ]}
                        />
                        <InputForm
                            id='companyCpfOrCnpj'
                            type='text'
                            label='CPF/CNPJ da Empresa'
                            placeholder='000.000.000-00'
                            value={formData.companyCpfOrCnpj}
                            onChange={(e) => setFormData({ ...formData, companyCpfOrCnpj: e.target.value })}
                        />
                    </ContainerInputColumn>

                    <ContainerInputColumn>
                        <InputForm
                            id='clientName'
                            type='text'
                            label='Nome do Cliente'
                            placeholder='Cliente'
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        />
                        <InputForm
                            id='clientCpfOrCnpj'
                            type='text'
                            label='CPF/CNPJ do Cliente'
                            placeholder='000.000.000-00'
                            value={formData.clientCpfOrCnpj}
                            onChange={(e) => setFormData({ ...formData, clientCpfOrCnpj: e.target.value })}
                        />
                    </ContainerInputColumn>

                    <ContainerInputRow>
                        <InputForm
                            id='quantity'
                            type='text'
                            label='Quantidade do Produto'
                            placeholder='1'
                            value={newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        />
                        <InputForm
                            id='description'
                            type='text'
                            label='Nome do Produto'
                            placeholder='Caixa Sextavada'
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <div style={{ alignItems: 'center', display: 'flex' }}>
                            <InputForm
                                id='price'
                                type='text'
                                label='Preço do Produto'
                                placeholder='6,00'
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
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
