import styles from './styles.module.css'
import { useLocation } from 'react-router-dom'
import type { IFormValues } from '../FormScreen'

export const ReceiptScreen = () => {
    const location = useLocation()
    const formValues: IFormValues = location.state

    return (
        <div className={styles.container}>
            <div className={styles.sheet}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <p>LOGO MAGIC FEST</p>
                    </div>
                    <div className={styles.data}>
                        <div>
                            <p className={styles.dataText}>RECIBO:</p>
                            <p>{formValues.receiptNumber}</p>
                        </div>
                        <div>
                            <p className={styles.dataText}>DATA:</p>
                            <p>{formValues.formattedDate}</p>
                        </div>
                        <div>
                            <p className={styles.dataText}>CLIENTE:</p>
                            <p>{formValues.clientName}</p>
                        </div>
                    </div>
                </div>
                <table className={styles.productsContainer}>
                    <thead>
                        <tr>
                            <th>QUANTIDADE</th>
                            <th>DESCRIÇÃO</th>
                            <th>PREÇO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formValues.productList.map((product, index) => (
                            <tr key={index}>
                                <td>{product.productQuantity}</td>
                                <td>{product.productDescripition}</td>
                                <td>R$ {product.productPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.total}>
                    <p>TOTAL:</p>
                    <p>R$ {formValues.totalProductPrice}</p>
                </div>
            </div>
        </div>
    )
}