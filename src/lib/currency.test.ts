import { describe, expect, it } from 'vitest'
import { formatNumber, formatRupiah } from './currency'

/** Intl untuk locale id-ID memakai non-breaking space (U+00A0) setelah "Rp". */
function normalizeSpaces(value: string): string {
  return value.replace(/\u00A0/g, ' ')
}

describe('formatRupiah', () => {
  it('memformat nominal tanpa desimal', () => {
    expect(normalizeSpaces(formatRupiah(1500000))).toBe('Rp 1.500.000')
  })

  it('memformat nominal dengan desimal ketika diminta', () => {
    expect(normalizeSpaces(formatRupiah(1500000.5, { decimals: true }))).toBe('Rp 1.500.000,50')
  })

  it('memformat nominal besar secara compact', () => {
    expect(normalizeSpaces(formatRupiah(1500000, { compact: true }))).toBe('Rp 1,5 jt')
  })

  it('memformat nol', () => {
    expect(normalizeSpaces(formatRupiah(0))).toBe('Rp 0')
  })
})

describe('formatNumber', () => {
  it('memformat angka dengan pemisah ribuan id-ID', () => {
    expect(formatNumber(25000)).toBe('25.000')
  })
})