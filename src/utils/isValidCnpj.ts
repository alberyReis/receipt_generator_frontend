export const isValidCnpj = (cnpj: string): boolean => {
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    const calculateCheckDigit = (base: string): number => {
        const weights = base.length === 12
            ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        const sum = base
            .split("")
            .reduce((total, digit, index) => total + parseInt(digit, 10) * weights[index], 0);

        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstCheckDigit = calculateCheckDigit(cnpj.slice(0, 12));
    const secondCheckDigit = calculateCheckDigit(cnpj.slice(0, 12) + firstCheckDigit);

    return firstCheckDigit === parseInt(cnpj[12], 10) && secondCheckDigit === parseInt(cnpj[13], 10);
};
