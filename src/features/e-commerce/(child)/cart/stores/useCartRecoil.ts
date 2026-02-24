import {produce} from 'immer'
import {useRecoilState, useRecoilValue} from "recoil";
import {cartItemsAtom} from "@feature/e-commerce/(child)/cart/stores/cartAtoms.ts";
import {cartTotalCount, cartTotalPrice} from "@feature/e-commerce/(child)/cart/stores/cartSelectors.ts";
import type {Cart} from "@feature/e-commerce/(child)/cart/types";

export const useCartRecoil = () => {
    const [items, setItems] = useRecoilState(cartItemsAtom)
    const totalItems = useRecoilValue(cartTotalCount)
    const totalPrice = useRecoilValue(cartTotalPrice)

    const addItem = (product: Omit<Cart, 'quantity'>, qty = 1) => {
        setItems(prev =>
            produce(prev, draft => {
                const cartItem = draft.find(item => item.id === product.id)
                if (cartItem) {
                    const finalQuantity = cartItem.quantity + qty
                    cartItem.quantity = finalQuantity
                    cartItem.price = finalQuantity * product.price
                } else {
                    draft.push({...product, quantity: qty})
                }
            }),
        )
    }

    const removeItem = (id: string) => {
        setItems(prev => produce(prev, draft => draft.filter(item => item.id !== id)))
    }

    const clearCart = () => {
        setItems([])
    }

    const setItemQuantity = (id: string, qty: number) => {
        if (qty <= 0) {
            removeItem(id)
            return
        }
        setItems(prev =>
            produce(prev, draft => {
                const cartItem = draft.find(x => x.id === id)
                if (cartItem) cartItem.quantity = qty
            }),
        )
    }

    return {
        cartItems: items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        clearCart,
        setItemQuantity,
    }
}