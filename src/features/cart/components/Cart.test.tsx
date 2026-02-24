import React from 'react'
import { describe, it, beforeEach, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {RecoilProvider} from "@shared/providers/recoil-provider/recoil-provider.tsx";
import { CartProvider } from '@feature/cart/context/cart-context'
import ProductList from '@feature/product/components/ProductList'
import Cart from '@feature/cart/components/Cart'
import CartButton from '@feature/cart/components/CartButton'

// STORAGE KEY must match your atom persistEffect key
const CART_STORAGE_KEY = 'frontend_triv_cart_v1'

function renderWithProviders(ui: React.ReactElement) {
    return render(<RecoilProvider><CartProvider>{ui}</CartProvider></RecoilProvider>)
}

beforeEach(() => {
    // keep tests isolated
    localStorage.clear()
})

describe('Cart integration (Recoil + CartContext)', () => {
    it('adds an item to the cart when clicking Add button', async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <>
                <ProductList />
                <Cart />
                <CartButton />
            </>
        )

        // find first "Add" button (ProductList renders those)
        const addButtons = screen.getAllByRole('button', { name: /add/i })
        expect(addButtons.length).toBeGreaterThan(0)

        // click first add button
        await user.click(addButtons[0])

        // now Cart should show the product (we used sample products: T-shirt, Hat, Sticker)
        expect(screen.getByText(/t-shirt/i)).toBeInTheDocument()

        // CartButton should show total items = 1
        expect(screen.getByRole('button', { name: /🛒/i })).toHaveTextContent(/\b1\b/)
    })

    it('removes an item from the cart', async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <>
                <ProductList />
                <Cart />
            </>
        )

        // add item
        const addBtn = screen.getAllByRole('button', { name: /add/i })[0]
        await user.click(addBtn)

        // ensure present
        const productName = screen.getByText(/t-shirt/i)
        expect(productName).toBeInTheDocument()

        // find Remove button for that item (Cart component has "Remove" button text)
        const removeBtn = screen.getByRole('button', { name: /remove/i })
        await user.click(removeBtn)

        // item should no longer be in the document
        expect(screen.queryByText(/t-shirt/i)).toBeNull()
        // cart empty message
        expect(screen.getByText(/cart is empty/i)).toBeInTheDocument()
    })

    it('clears cart when clicking Clear Cart', async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <>
                <ProductList />
                <Cart />
            </>
        )

        // add two items (first two product "Add" buttons)
        const addButtons = screen.getAllByRole('button', { name: /add/i })
        await user.click(addButtons[0])
        await user.click(addButtons[1])

        // both product names should appear
        expect(screen.getByText(/t-shirt/i)).toBeInTheDocument()
        expect(screen.getByText(/hat/i)).toBeInTheDocument()

        // click Clear Cart
        const clearBtn = screen.getByRole('button', { name: /clear cart/i })
        await user.click(clearBtn)

        // cart should be empty
        expect(screen.queryByText(/t-shirt/i)).toBeNull()
        expect(screen.getByText(/cart is empty/i)).toBeInTheDocument()
    })

    it('restores cart from localStorage on mount (persistence)', async () => {
        // prepare a saved cart in localStorage to simulate persisted state
        const saved = [
            { id: 'p1', name: 'T-shirt', price: 19.99, quantity: 2 },
        ]
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(saved))

        // render provider + Cart; the atom effect should read localStorage on initialization
        renderWithProviders(<Cart />)

        // the persisted item should appear
        expect(await screen.findByText(/t-shirt/i)).toBeInTheDocument()
        // total should be price * qty
        expect(screen.getByText(/total/i)).toHaveTextContent(/39.98/)
    })
})