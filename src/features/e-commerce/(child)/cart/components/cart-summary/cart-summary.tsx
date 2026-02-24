import { Card, CardHeader, CardContent, CardFooter } from '@shared/components/ui/card'
import { useCartSummary } from './use-cart-summary'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/components/ui/select'
import { Button } from '@shared/components/ui/button'
import type {Currency} from "@feature/e-commerce/(child)/cart/components/cart-summary/types.ts";
import { Separator } from "@shared/components/ui/separator"
import {DialogCheckout, useDialogCheckout} from "@feature/e-commerce/(child)/cart/components/dialog-checkout";

export default function CartSummary() {
    const {
        currency,
        setCurrency,
        formattedTotal,
        convertedTotal,
        totalItems
    } = useCartSummary()
    const {
        open,
        onOpenChange,
        amount,
        setAmount,
        onConfirm,
    } = useDialogCheckout(convertedTotal, currency)

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <h3 className="text-lg font-semibold">Ringkasan Pesanan</h3>
            </CardHeader>

            <CardContent >
                <Separator className="mb-4" />
                <div className="flex items-center justify-between mb-4">
                    <span>Currency</span>
                    <Select
                        onValueChange={(v: string) => setCurrency(v as Currency)}
                        value={currency}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="IDR">IDR — Rp</SelectItem>
                            <SelectItem value="USD">USD — $</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total estimasi</span>
                    <span className="font-semibold">{formattedTotal}</span>
                </div>

            </CardContent>

            <CardFooter className="flex flex-col gap-2">
                <Button disabled={totalItems === 0} className="w-full" onClick={() => onOpenChange(true)}>
                    Lanjutkan pembayaran
                </Button>
            </CardFooter>

            {/* Dialog */}
            <DialogCheckout
                open={open}
                onOpenChange={onOpenChange}
                formattedTotal={formattedTotal}
                currencyLabel={currency}
                amount={amount}
                setAmount={setAmount}
                onConfirm={onConfirm}
            />
        </Card>
    )
}