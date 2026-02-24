import { useCallback, useMemo, useState } from 'react'
import {useCartRecoil} from "@feature/e-commerce/(child)/cart/stores/useCartRecoil.ts";
import {convertCurrency} from "@shared/utils";
import type {Currency} from "@feature/e-commerce/(child)/cart/components/cart-summary/types.ts";

const USD_RATE = 16000

export function useCartSummary() {
    const { cartItems, totalItems, totalPrice } = useCartRecoil()
    const [currency, setCurrency] = useState<Currency>('IDR')

    const convertedTotal = useMemo(() => {
        if (currency === 'USD') return totalPrice / USD_RATE;
        return totalPrice;
    }, [totalPrice, currency]);

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

    const onChangeCurrency = useCallback((c: Currency) => setCurrency(c), [])

    return {
        currency,
        setCurrency: onChangeCurrency,
        totalItems,
        convertedTotal,
        formattedTotal,
        cartItems,
    }
}