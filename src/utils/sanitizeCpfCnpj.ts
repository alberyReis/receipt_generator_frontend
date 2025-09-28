export const sanitizeCpfCnpj = (value: string): string => {
   return value.replace(/\D/g, "")
}