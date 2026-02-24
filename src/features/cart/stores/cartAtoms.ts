import { atom } from 'recoil'
import type {Cart} from "@feature/cart/types";
import recoilPersistStorage from "@shared/utils/recoil-persist-storage";

const CART_STORAGE_KEY = 'frontend_triv_cart_v1'

export const cartItemsAtom = atom<Cart[]>({
    key: 'cartItems',
    default: [],
    effects: [
        recoilPersistStorage<Cart[]>(CART_STORAGE_KEY),
    ]
})