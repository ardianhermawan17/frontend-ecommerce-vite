import { useCallback, useMemo, useState } from 'react';
import { useCartRecoil } from '@feature/e-commerce/(child)/cart/stores/useCartRecoil.ts';
import { convertCurrency } from '@shared/utils';
import type { Currency } from '@feature/e-commerce/(child)/cart/components/cart-summary/types.ts';

const USD_RATE = 16000;

export function useCartSummary() {
	const { cartItems, selectedTotalItems, selectedTotalPrice } = useCartRecoil();
	const [currency, setCurrency] = useState<Currency>('IDR');

	const convertedTotal = useMemo(() => {
		if (currency === 'USD') return selectedTotalPrice / USD_RATE;
		return selectedTotalPrice;
	}, [selectedTotalPrice, currency]);

	const formattedTotal = useMemo(() => {
		const countryKey = currency === 'USD' ? 'usa' : 'indonesia';
		try {
			return convertCurrency(convertedTotal, countryKey);
		} catch {
			return currency === 'USD'
				? `$${convertedTotal.toFixed(2)}`
				: `Rp${Math.round(convertedTotal).toLocaleString()}`;
		}
	}, [convertedTotal, currency]);

	const onChangeCurrency = useCallback((c: Currency) => setCurrency(c), []);

	return {
		currency,
		setCurrency: onChangeCurrency,
		totalItems: selectedTotalItems,
		convertedTotal,
		formattedTotal,
		cartItems,
	};
}
