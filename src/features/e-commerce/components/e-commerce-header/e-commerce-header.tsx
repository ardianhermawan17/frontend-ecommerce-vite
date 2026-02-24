import { Link } from "react-router"
import { DarkModeToggle } from "@shared/components/template/dark-mode-toggle"
import { Button } from "@shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@shared/components/ui/dropdown-menu"
import { ShoppingCart } from "lucide-react"
import {useECommerceHeader} from "@feature/e-commerce/components/e-commerce-header/use-e-commerce-header.ts";
import {convertCurrency} from "@shared/utils";


export function ECommerceHeader() {
    const { cartItems, totalItems } = useECommerceHeader()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-sm">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <h1 className="font-semibold text-lg">Ardian E-commerce</h1>
                <div className="flex items-center gap-3">
                    <DarkModeToggle />
                    {/* Cart Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="size-5" />
                                {totalItems > 0 && (
                                    <span className="absolute bottom-5 left-5 text-[10px] bg-primary text-primary-foreground rounded-full px-1">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-64">

                            {/* Header */}
                            <div className="flex items-center justify-between px-2 py-1 text-sm font-medium">
                                <span>Keranjang</span>
                                <Link to="/e-commerce/cart" className="text-primary hover:underline">
                                    Lihat
                                </Link>
                            </div>
                            <DropdownMenuSeparator />

                            {/* Cart Items */}
                            {cartItems.length === 0 && (
                                <DropdownMenuItem disabled className="opacity-70">
                                    Keranjang kosong
                                </DropdownMenuItem>
                            )}

                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between px-2 py-1 text-sm"
                                >
                                    <span>{item.name}</span>
                                    <span className="font-medium">{item.quantity} x {convertCurrency(item.price, "indonesia")}</span>
                                </div>
                            ))}

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}