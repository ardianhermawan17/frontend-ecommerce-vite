import {selector} from "recoil";
import {cartItemsAtom} from "@feature/e-commerce/(child)/cart/stores/cartAtoms.ts";

export const cartTotalCount = selector<number>({
    key: 'cartTotalCount',
    get: ({ get }) => {
        const items = get(cartItemsAtom)
        return items.reduce((s, it) => s + it.quantity, 0)
    }
})

export const cartTotalPrice = selector<number>({
    key: 'cartTotalPrice',
    get: ({ get }) => {
        const items = get(cartItemsAtom)
        return items.reduce((s, it) => s + it.price * it.quantity, 0)
    }
})