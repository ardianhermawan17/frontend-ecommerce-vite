import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@shared/components/ui/dialog'
import {Button} from '@shared/components/ui/button'
import {Input} from '@shared/components/ui/input'
import {Separator} from '@shared/components/ui/separator'
import {preventNonTextKeydown} from "@shared/utils";

type DialogCheckoutProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    formattedTotal: string| number
    currencyLabel?: string
    amount: number | ''
    setAmount: (v: number | '') => void
    onConfirm: () => boolean
}

export function DialogCheckout({
    open,
    onOpenChange,
    formattedTotal,
    currencyLabel = 'IDR',
    amount,
    setAmount,
    onConfirm,
}: DialogCheckoutProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Silahkan bayar</DialogTitle>
                    <DialogDescription>
                        Total yang harus dibayar:
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-2 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Total</div>
                        <div className="text-lg font-semibold">{formattedTotal}</div>
                    </div>
                </div>

                <Separator />

                <div className="mt-4 space-y-2">
                    <label className="block text-sm">Masukkan jumlah pembayaran</label>
                    <Input
                        type="number"
                        min={0}
                        step="0.01"
                        onKeyDown={preventNonTextKeydown}
                        value={amount === '' ? '' : String(amount)}
                        onChange={(e) =>
                            setAmount(e.target.value === '' ? '' : Number(e.target.value))
                        }
                        placeholder={`Masukkan jumlah (${currencyLabel})`}
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <p className="text-xs text-muted-foreground">
                        Masukkan jumlah yang akan Anda bayar. Jika jumlah kurang dari total,
                        transaksi akan gagal.
                    </p>
                </div>

                <DialogFooter>
                    <div className="flex w-full gap-2">
                        <DialogClose>
                            <Button variant="outline" className="w-full">
                                Batal
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={() => {
                                return onConfirm()
                            }}
                        >
                            Bayar sekarang
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}