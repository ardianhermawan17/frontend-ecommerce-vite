import React from 'react';
import { RecoilProvider } from "@shared/providers/recoil-provider";
import { ShadcnProvider } from "@shared/providers/shadcn-provider";
import {CartProvider} from "@feature/e-commerce/(child)/cart/context/cart-context";

/* HOC Component untuk wrapper disini ya, seperti shadcn */

export const LibraryProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ShadcnProvider>
            <RecoilProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </RecoilProvider>
        </ShadcnProvider>
    )
}