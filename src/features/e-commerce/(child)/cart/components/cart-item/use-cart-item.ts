import {useCallback, useMemo, useState} from 'react'
import {useCartRecoil} from "@feature/e-commerce/(child)/cart/stores/useCartRecoil.ts";
import type {Cart} from "@feature/e-commerce/(child)/cart/types";

export function useCartItem(item: Cart) {
    const initialQty = Number.isFinite(Number(item.quantity)) ? Number(item.quantity) : 0
    const [localQty, setLocalQty] = useState<number>(initialQty )

    const totalPrice = useMemo(() => item.price, [item.price])

    const { addItem, removeItem, setItemQuantity } = useCartRecoil()

    const onAdd = useCallback(() => {
        setLocalQty((prev) => {
            const next = prev + 1
            addItem({ id: item.id, name: item.name, price: item.price }, 1)
            return next
        })
    }, [addItem, item])

    const onRemove = useCallback(() => {
        setLocalQty((prev) => {
            const next = Math.max(0, prev - 1)
            if (next <= 0) removeItem(item.id)
            else setItemQuantity(item.id, next)
            return next
        })
    }, [removeItem, item.id, setItemQuantity])

    const onSetQuantity = useCallback(
        (qty: number) => {
            const quantity = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0
            setLocalQty(quantity)

            if (quantity <= 0) removeItem(item.id)
            else setItemQuantity(item.id, quantity)
        },
        [removeItem, setItemQuantity, item.id],
    )

    const handleQtyChange = useCallback(
        (value: number) => {
            onSetQuantity(value)
        },
        [onSetQuantity],
    )

    return {
        onAdd,
        onRemove,
        handleQtyChange,
        localQty,
        totalPrice,
    }
}