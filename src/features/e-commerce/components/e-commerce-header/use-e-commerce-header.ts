import {useCartRecoil} from "@feature/e-commerce/(child)/cart/stores/useCartRecoil.ts";

export function useECommerceHeader() {
    const {cartItems} = useCartRecoil()

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    return {
        cartItems,
        totalItems,
    }
}