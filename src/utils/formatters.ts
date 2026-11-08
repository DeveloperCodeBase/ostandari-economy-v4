// Persian number and currency formatting utilities

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(val: number | string | undefined | null): string {
  if (val === undefined || val === null) return '۰';
  const str = typeof val === 'number' ? val.toString() : String(val);
  return str.replace(/\d/g, (digit) => PERSIAN_DIGITS[parseInt(digit, 10)] || digit);
}

export function formatWithCommas(num: number | string): string {
  if (num === undefined || num === null) return '۰';
  const clean = typeof num === 'number' ? num : parseFloat(String(num));
  if (isNaN(clean)) return String(num);
  
  const parts = clean.toLocaleString('en-US').split('.');
  parts[0] = parts[0].replace(/,/g, '٬');
  return parts.join('.');
}

export function formatPersianNumber(num: number | string): string {
  return toPersianDigits(formatWithCommas(num));
}

export function formatPersianCurrency(amount: number, unit: string = 'همت'): string {
  return `${formatPersianNumber(amount)} ${unit}`;
}

export function formatPercentage(rate: number, showSign: boolean = false): string {
  const sign = showSign && rate > 0 ? '+' : '';
  const formatted = toPersianDigits(rate.toFixed(1));
  return `${sign}${formatted}٪`;
}
