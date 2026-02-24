'use client'

import {useCart} from "@feature/cart/context/cart-context";

export default function Cart() {
    const { cartItems, totalPrice, removeItem, clearCart, setItemQuantity } = useCart()

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <div>Cart is empty</div>
            ) : (
                <>
                    <ul>
                        {cartItems.map(it => (
                            <li key={it.id} style={{ marginBottom: 8 }}>
                                <div>{it.name} — ${it.price} × {it.quantity}</div>
                                <div>
                                    <button onClick={() => setItemQuantity(it.id, Math.max(1, it.quantity - 1))}>-</button>
                                    <button onClick={() => setItemQuantity(it.id, it.quantity + 1)}>+</button>
                                    <button onClick={() => removeItem(it.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div>Total: ${totalPrice.toFixed(2)}</div>
                    <button onClick={clearCart}>Clear Cart</button>
                </>
            )}
        </div>
    )
}