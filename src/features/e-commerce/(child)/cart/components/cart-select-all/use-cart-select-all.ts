import { useCartRecoil } from '@feature/e-commerce/(child)/cart/stores/useCartRecoil';

export function useCartSelectAll() {
	const { isAllSelected, selectAll, deselectAll, cartItems } = useCartRecoil();

	const handleToggleSelectAll = (checked: boolean) => {
		if (checked) {
			selectAll();
		} else {
			deselectAll();
		}
	};

	return {
		isAllSelected,
		handleToggleSelectAll,
		hasItems: cartItems.length > 0,
	};
}
