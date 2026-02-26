import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@shared/components/ui/card';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Checkbox } from '@shared/components/ui/checkbox';
import { useCartItem } from './use-cart-item';
import type { Cart } from '@feature/e-commerce/(child)/cart/types';
import { Minus, Plus } from 'lucide-react';
import { convertCurrency, preventNonTextKeydown } from '@shared/utils';
interface Props {
	item: Cart;
}

export function CartItem({ item }: Props) {
	const {
		onAdd,
		onRemove,
		totalPrice,
		localQty,
		handleQtyChange,
		handleToggleSelect,
		itemIsSelected,
	} = useCartItem(item);

	return (
		<Card className='w-full'>
			<CardHeader>
				<div className='flex items-center gap-3'>
					<Checkbox
						id={`select-${item.id}`}
						checked={itemIsSelected}
						onCheckedChange={handleToggleSelect}
					/>
					<div className='flex-1 flex items-center justify-between'>
						<label
							htmlFor={`select-${item.id}`}
							className='font-semibold cursor-pointer'
						>
							{item.name}
						</label>
						<div className='text-sm font-medium'>
							{convertCurrency(totalPrice, 'indonesia')}
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<p className='text-sm text-muted-foreground'>
					Deskripsi singkat produk (placeholder)
				</p>
			</CardContent>

			<CardFooter className='flex items-center justify-between gap-4'>
				<div className='flex items-center gap-2'>
					<Button size='icon' variant='outline' onClick={onAdd}>
						<Plus className='size-4' />
					</Button>
					<div className='flex items-center gap-2'>
						<Input
							type='number'
							min={0}
							step={1}
							value={localQty}
							onKeyDown={preventNonTextKeydown}
							onChange={(e) =>
								handleQtyChange(Math.max(0, Number(e.target.value) || 0))
							}
							className='w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
						/>
					</div>
					<Button size='icon' variant='destructive' onClick={onRemove}>
						<Minus className='size-4' />
					</Button>
				</div>

				<div className='text-sm text-muted-foreground'>{item.quantity} pcs</div>
			</CardFooter>
		</Card>
	);
}
