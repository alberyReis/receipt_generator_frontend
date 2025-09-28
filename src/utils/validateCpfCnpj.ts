import type { ValidateCpfCnpjResult } from "../interfaces/interfaces";
import { isValidCnpj } from "./isValidCnpj";
import { isValidCpf } from "./isValidCpf";
import { sanitizeCpfCnpj } from "./sanitizeCpfCnpj";

export const validateCpfCnpj = (value: string): ValidateCpfCnpjResult => {
    const sanitized = sanitizeCpfCnpj(value);

    if (sanitized.length === 11 && isValidCpf(sanitized)) {
        return { value: sanitized, type: "CPF", isValid: true };
    }

    if (sanitized.length === 14 && isValidCnpj(sanitized)) {
        return { value: sanitized, type: "CNPJ", isValid: true };
    }

    return { value: "", type: "", isValid: false };
};
