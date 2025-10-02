import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import type { FormValues } from '../../interfaces/interfaces';
import { formatCurrency } from '../../utils/formatCurrency';

export const ReceiptScreen = () => {
    const location = useLocation();
    const formData: FormValues = location.state;

    return (
        <div className={styles.container}>
            <div className={styles.sheet}>
                <div>
                    <header className={styles.header}>
                        <div className={styles.titleContainer}>
                            <div className={styles.separatorLine}></div>
                            <p className={styles.title}>Recibo</p>
                        </div>
                        <img
                            src="/logo_mg.png"
                            alt="Logo da Magic Fest"
                            width="60"
                        />
                    </header>
                    <section className={styles.clientSection}>
                        <div className={styles.clientInfo}>
                            <div className={styles.fieldGroup}>
                                <p className={styles.fieldLabel}>DE:</p>
                                <p>{formData.companyName}</p>
                                {formData.companyCpfOrCnpj &&
                                    <p>{formData.companyCpfOrCnpj}</p>
                                }
                            </div>
                            <div className={styles.fieldGroup}>
                                <p className={styles.fieldLabel}>COBRAR A:</p>
                                <p>{formData.clientName}</p>
                                <p>{formData.clientCpfOrCnpj}</p>
                            </div>
                        </div>
                        <div className={styles.orderInfo}>
                            <div className={styles.fieldLabels}>
                                <p className={styles.fieldLabelRight}>NÚMERO DO PEDIDO:</p>
                                <p className={styles.fieldLabelRight}>DATA DO PEDIDO:</p>
                            </div>
                            <div className={styles.fieldValues}>
                                <p className={styles.fieldValue}>{formData.receiptNumber}</p>
                                <p className={styles.fieldValue}>{formData.formattedDate}</p>
                            </div>
                        </div>
                    </section>
                    <table className={styles.productsTable}>
                        <thead>
                            <tr>
                                <th>QTD</th>
                                <th>DESCRIÇÃO</th>
                                <th className={styles.priceColumn}>PREÇO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.quantity}</td>
                                    <td>{product.description}</td>
                                    <td className={styles.priceColumn}>R${formatCurrency(product.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.totalRow}>
                        <p>TOTAL:</p>
                        <p>R$ {formData.totalProductPrice}</p>
                    </div>
                </div>
                <footer className={styles.footer}>
                    <p>Atenciosamente, Magic Fest</p>
                </footer>
            </div>
        </div>
    );
};
