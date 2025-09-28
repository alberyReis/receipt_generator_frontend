export interface Product {
    quantity: string | undefined
    description: string
    price: string | undefined
}

export interface ValidateCpfCnpjResult {
    value: string
    type: 'CPF' | 'CNPJ' | ''
    isValid: boolean | undefined
}

export interface FormattedCpfCnpj {
    formattedValue: string
    isValid: boolean
}

export interface FormValues {
    receiptNumber: string
    formattedDate: string
    companyName: string
    companyCpfOrCnpj?: string
    clientName: string
    clientCpfOrCnpj: string
    totalProductPrice: string
    products: Product[]
}