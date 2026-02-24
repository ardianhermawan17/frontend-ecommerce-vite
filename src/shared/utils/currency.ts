import {listCurrency} from "@shared/data/currency";

export const convertCurrency = (value: number, country: string = "indonesia") => {
    const selectedCurrency = listCurrency.find(
        (currency) => currency.name === country
    );
    if (selectedCurrency)
        return new Intl.NumberFormat(selectedCurrency.locales, {
            style: "currency",
            currency: selectedCurrency.currency,
            maximumSignificantDigits: 1,
        }).format(value);
    return value;
};