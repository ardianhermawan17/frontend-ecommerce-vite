'use client'

import React from "react"
import { ThemeProvider } from "@shared/providers/theme-provider"

export const ShadcnProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    )
}