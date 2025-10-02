export function formatCurrency(value: string | undefined): string {
  if (!value) return ""

  const numberValue = Number(value.replace(",", "."))

  if (isNaN(numberValue)) return value

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(numberValue)
}