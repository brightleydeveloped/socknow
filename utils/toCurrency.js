export const SYMBOLS = {
	'USD': '$'
};

export default function toCurrency(currency, priceInCents) {
	return `${SYMBOLS[currency]}${(priceInCents / 100.0).toFixed(2)}`;
}
