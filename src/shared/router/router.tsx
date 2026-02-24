import {lazy, Suspense} from "react";
import {createBrowserRouter} from "react-router";
// Normal pages
import Index from '@app/index.tsx'
import RootLayout from "@app/layout.tsx";
import ECommerceLayout from "@app/e-commerce/layout.tsx";
// Lazy pages
const RecoilSmoke = lazy(() => import('@app/recoil-smoke/page.tsx'));


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Index /> },
            {
                path: 'recoil-smoke',
                element: (
                    <Suspense fallback={<div>Loading page...</div>}>
                        <RecoilSmoke />
                    </Suspense>
                ),
            },
            {
                path: 'e-commerce',
                element: <ECommerceLayout />,
                children: [
                    {
                        index: true,
                        path: 'product'
                    },
                    {
                        path: 'cart'
                    }
                ]
            }
        ],
    },
])

export default router