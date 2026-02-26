import { atom } from 'recoil';
import type { Cart } from '@feature/e-commerce/(child)/cart/types';
import recoilPersistStorage from '@shared/utils/recoil-persist-storage.ts';

const CART_STORAGE_KEY = 'frontend_triv_cart_v1';
const CART_SELECTED_KEY = 'frontend_triv_cart_selected_v1';

export const cartItemsAtom = atom<Cart[]>({
	key: 'cartItems',
	default: [],
	effects: [recoilPersistStorage<Cart[]>(CART_STORAGE_KEY)],
});

export const cartSelectedItemsAtom = atom<Set<string>>({
	key: 'cartSelectedItems',
	default: new Set<string>(),
	effects: [
		recoilPersistStorage<Set<string>>(CART_SELECTED_KEY, {
			serialize: (value) => JSON.stringify(Array.from(value)),
			deserialize: (value) => new Set(JSON.parse(value)),
		}),
	],
});
