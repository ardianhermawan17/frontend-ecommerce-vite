import { DarkModeToggle } from "@shared/components/template/dark-mode-toggle"

export function PromotionHeader() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-sm">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <h1 className="font-semibold text-lg">Triv Trading Competition</h1>
                <div className="flex items-center gap-3">
                    <DarkModeToggle />
                </div>
            </div>
        </nav>
    )
}