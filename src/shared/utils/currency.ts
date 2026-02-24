import {listCurrency} from "@shared/data/currency";

export const convertCurrency = (value: number, country: string = "indonesia") => {
    const selectedCurrency = listCurrency.find(
        (currency) => currency.name === country
    );
    if (!selectedCurrency) return value;

    const { locales, currency } = selectedCurrency;

    const fractionDigits = currency === "IDR" ? 0 : 2;

    return new Intl.NumberFormat(locales, {
        style: "currency",
        currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }).format(value);
};