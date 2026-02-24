'use client'
import React from 'react'
import {useCart} from "@feature/cart/context/cart-context";


export default function CartButton() {
    const { totalItems } = useCart()
    return <button aria-label="cart">🛒 {totalItems}</button>
}