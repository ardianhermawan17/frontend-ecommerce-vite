import {lazy, Suspense} from "react";
import {createBrowserRouter} from "react-router";
// Normal pages
import Index from '@app/index.tsx'
import RootLayout from "@app/layout.tsx";
import ECommerceLayout from "@app/e-commerce/layout.tsx";
// Lazy pages
const ProductPage = lazy(() => import('@app/e-commerce/product'));
const CartPage = lazy(() => import('@app/e-commerce/cart'));


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Index /> },
            {
                path: 'e-commerce',
                element: <ECommerceLayout />,
                children: [
                    {
                        index: true,
                        path: 'product',
                        element: (
                            <Suspense fallback={<div>Loading products...</div>}>
                                <ProductPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'cart',
                        element: (
                            <Suspense fallback={<div>Loading cart...</div>}>
                                <CartPage />
                            </Suspense>
                        ),
                    }
                ]
            }
        ],
    },
])

export default router