import { produce } from 'immer';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	cartItemsAtom,
	cartSelectedItemsAtom,
} from '@feature/e-commerce/(child)/cart/stores/cartAtoms.ts';
import {
	cartTotalCount,
	cartTotalPrice,
	cartSelectedTotalCount,
	cartSelectedTotalPrice,
} from '@feature/e-commerce/(child)/cart/stores/cartSelectors.ts';
import type { Cart } from '@feature/e-commerce/(child)/cart/types';

export const useCartRecoil = () => {
	const [items, setItems] = useRecoilState(cartItemsAtom);
	const [selectedIds, setSelectedIds] = useRecoilState(cartSelectedItemsAtom);
	const totalItems = useRecoilValue(cartTotalCount);
	const totalPrice = useRecoilValue(cartTotalPrice);
	const selectedTotalItems = useRecoilValue(cartSelectedTotalCount);
	const selectedTotalPrice = useRecoilValue(cartSelectedTotalPrice);

	const addItem = (product: Omit<Cart, 'quantity'>, qty = 1) => {
		setItems((prev) =>
			produce(prev, (draft) => {
				const cartItem = draft.find((item) => item.id === product.id);
				if (cartItem) {
					cartItem.quantity = cartItem.quantity + qty;
				} else {
					draft.push({ ...product, quantity: qty });
				}
			}),
		);
	};

	const removeItem = (id: string) => {
		setItems((prev) =>
			produce(prev, (draft) => {
				const index = draft.findIndex((item) => item.id === id);
				if (index !== -1) {
					draft.splice(index, 1);
				}
			}),
		);
		// Also remove from selected
		setSelectedIds((prev) => {
			const newSet = new Set(prev);
			newSet.delete(id);
			return newSet;
		});
	};

	const clearCart = () => {
		setItems([]);
		setSelectedIds(new Set());
	};

	const removeSelectedItems = () => {
		setItems((prev) =>
			produce(prev, (draft) => {
				// Filter out selected items
				return draft.filter((item) => !selectedIds.has(item.id));
			}),
		);
		// Clear selection after removing
		setSelectedIds(new Set());
	};

	const setItemQuantity = (id: string, qty: number) => {
		if (qty <= 0) {
			removeItem(id);
			return;
		}
		setItems((prev) =>
			produce(prev, (draft) => {
				const cartItem = draft.find((x) => x.id === id);
				if (cartItem) cartItem.quantity = qty;
			}),
		);
	};

	const toggleSelectItem = (id: string) => {
		setSelectedIds((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	const selectAll = () => {
		setSelectedIds(new Set(items.map((item) => item.id)));
	};

	const deselectAll = () => {
		setSelectedIds(new Set());
	};

	const isSelected = (id: string) => selectedIds.has(id);

	const isAllSelected = items.length > 0 && selectedIds.size === items.length;

	return {
		cartItems: items,
		totalItems,
		totalPrice,
		selectedTotalItems,
		selectedTotalPrice,
		selectedItemsCount: selectedIds.size,
		addItem,
		removeItem,
		clearCart,
		removeSelectedItems,
		setItemQuantity,
		toggleSelectItem,
		selectAll,
		deselectAll,
		isSelected,
		isAllSelected,
	};
};
