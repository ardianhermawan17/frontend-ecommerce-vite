import { useMemo } from 'react'
import {useCartRecoil} from "@feature/e-commerce/(child)/cart/stores/useCartRecoil.ts";

export function useCartList() {
    const {
        cartItems,
        totalItems,
        totalPrice,
        removeItem,
        setItemQuantity,
        clearCart
    } = useCartRecoil()

    const items = cartItems
    const count = totalItems
    const price = totalPrice

    const itemIds = useMemo(() => items.map((item) => item.id), [items])

    return {
        items,
        count,
        price,
        removeItem,
        setItemQuantity,
        clearCart,
        itemIds,
    }
}