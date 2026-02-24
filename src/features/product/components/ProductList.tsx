'use client'
import React from 'react'
import {useCart} from "@feature/cart/context/cart-context";
import {products} from "@shared/data/products";

export default function ProductList() {
    const { addItem } = useCart()
    return (
        <div>
            <h3>Products</h3>
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        {p.name} — ${p.price.toFixed(2)}
                        <button onClick={() => addItem({ id: p.id, name: p.name, price: p.price })}>
                            Add
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}