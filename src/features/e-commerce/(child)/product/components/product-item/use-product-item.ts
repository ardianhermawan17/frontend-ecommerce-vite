import { useCallback } from 'react'
import { toast } from 'sonner'
import {useCartRecoil} from "@feature/e-commerce/(child)/cart/stores/useCartRecoil.ts";
import type {Product} from "@feature/e-commerce/(child)/product/types";


export function useProduct(product: Product) {
    const { addItem } = useCartRecoil()

    const handleAddToCart = useCallback(
        (qty = 1) => {
            addItem({ id: product.id, name: product.name, price: product.price }, qty)
            toast.success(`${product.name} ditambahkan ke keranjang`)
        },
        [addItem, product],
    )

    return {
        handleAddToCart,
    }
}