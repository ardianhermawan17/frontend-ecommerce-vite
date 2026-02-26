import { selector } from 'recoil';
import {
	cartItemsAtom,
	cartSelectedItemsAtom,
} from '@feature/e-commerce/(child)/cart/stores/cartAtoms.ts';

export const cartTotalCount = selector<number>({
	key: 'cartTotalCount',
	get: ({ get }) => {
		const items = get(cartItemsAtom);
		return items.reduce((s, it) => s + it.quantity, 0);
	},
});

export const cartTotalPrice = selector<number>({
	key: 'cartTotalPrice',
	get: ({ get }) => {
		const items = get(cartItemsAtom);
		return items.reduce((s, it) => s + it.price * it.quantity, 0);
	},
});

export const cartSelectedTotalCount = selector<number>({
	key: 'cartSelectedTotalCount',
	get: ({ get }) => {
		const items = get(cartItemsAtom);
		const selectedIds = get(cartSelectedItemsAtom);
		return items
			.filter((item) => selectedIds.has(item.id))
			.reduce((s, it) => s + it.quantity, 0);
	},
});

export const cartSelectedTotalPrice = selector<number>({
	key: 'cartSelectedTotalPrice',
	get: ({ get }) => {
		const items = get(cartItemsAtom);
		const selectedIds = get(cartSelectedItemsAtom);
		return items
			.filter((item) => selectedIds.has(item.id))
			.reduce((s, it) => s + it.price * it.quantity, 0);
	},
});
