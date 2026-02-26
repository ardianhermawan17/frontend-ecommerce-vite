import { Checkbox } from '@shared/components/ui/checkbox';
import { useCartSelectAll } from './use-cart-select-all';

export function CartSelectAll() {
	const { isAllSelected, handleToggleSelectAll, hasItems } = useCartSelectAll();

	if (!hasItems) return null;

	return (
		<div className='flex items-center gap-3 p-4 bg-muted/50 rounded-md'>
			<Checkbox
				id='select-all'
				checked={isAllSelected}
				onCheckedChange={handleToggleSelectAll}
			/>
			<label
				htmlFor='select-all'
				className='text-sm font-medium cursor-pointer select-none'
			>
				Pilih semua produk
			</label>
		</div>
	);
}
