'use client'

import React, { createContext, useContext } from 'react'
import { useCartRecoil } from "@feature/cart/stores/useCartRecoil"
import type {Cart} from "@feature/cart/types";

export type CartContextValue = {
    cartItems: Cart[]
    totalItems: number
    totalPrice: number
    addItem: (item: Omit<Cart, 'quantity'>, qty?: number) => void
    removeItem: (id: string) => void
    clearCart: () => void
    setItemQuantity: (id: string, qty: number) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const value = useCartRecoil()

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used inside CartProvider')
    return ctx
}