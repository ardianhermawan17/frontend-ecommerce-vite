'use client'

import React from "react"
import { ThemeProvider } from "@shared/providers/theme-provider"
import {TooltipProvider} from "@shared/components/ui/tooltip.tsx";
import {Toaster} from "@shared/components/ui/sonner.tsx";

export const ShadcnProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <TooltipProvider>
                {children}
            </TooltipProvider>
            <Toaster/>
        </ThemeProvider>
    )
}