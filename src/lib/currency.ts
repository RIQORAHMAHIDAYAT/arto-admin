export function formatRupiah(amount: number, options: { decimals?: boolean; compact?: boolean } = {}): string {
  const { decimals = false, compact = false } = options
  if (compact) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount)
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  }).format(amount)
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount)
}