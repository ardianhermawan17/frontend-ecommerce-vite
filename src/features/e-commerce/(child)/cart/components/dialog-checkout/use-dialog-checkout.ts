import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useCartRecoil } from '@feature/e-commerce/(child)/cart/stores/useCartRecoil.ts';
import { convertCurrency } from '@shared/utils';

export function useDialogCheckout(
	convertedTotal: number,
	currencyLabel = 'IDR',
) {
	const { removeSelectedItems } = useCartRecoil();
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState<number | ''>('');
	const covertCurrencyLabel = currencyLabel === 'USD' ? 'usa' : 'indonesia';

	const reset = useCallback(() => {
		setAmount('');
	}, []);

	const onOpenChange = useCallback(
		(val: boolean) => {
			setOpen(val);
			if (!val) reset();
		},
		[reset],
	);

	const onConfirm = useCallback(() => {
		const paid = Number(amount) || 0;
		if (paid < convertedTotal - 0.0001) {
			toast.error('Transaksi gagal: pembayaran kurang dari total.');
			return false;
		}

		removeSelectedItems();
		if (paid == convertedTotal - 0.0001)
			toast.success(
				`Transaksi berhasil. Uangnya pas terima kasih! (${convertCurrency(paid, covertCurrencyLabel)})`,
			);
		else if (paid > convertedTotal - 0.0001) {
			const change = paid - convertedTotal;
			toast.success(
				`Transaksi berhasil. Kembalian ${convertCurrency(change, covertCurrencyLabel)}. Terima kasih!`,
			);
		}
		setOpen(false);
		reset();
		return true;
	}, [amount, convertedTotal, removeSelectedItems, covertCurrencyLabel, reset]);

	return {
		open,
		setOpen,
		onOpenChange,
		amount,
		setAmount,
		onConfirm,
	};
}
