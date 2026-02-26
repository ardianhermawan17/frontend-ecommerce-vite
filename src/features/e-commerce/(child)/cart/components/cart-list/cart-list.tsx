import { useCartList } from './use-cart-list';
import { Button } from '@shared/components/ui/button';
import { Link } from 'react-router';
import { Fragment } from 'react';
import { CartItem } from '@feature/e-commerce/(child)/cart/components/cart-item/cart-item.tsx';

export function CartList() {
	const { items, clearCart } = useCartList();

	return (
		<section className='space-y-4'>
			{items.length === 0 ? (
				<div className='p-6 bg-muted rounded-md text-center'>
					Keranjang kosong
				</div>
			) : (
				<div className='space-y-3'>
					{items.map((it) => (
						<Fragment key={it.id}>
							<CartItem item={it} />
						</Fragment>
					))}
				</div>
			)}

			{/* Footer */}
			<div className='flex items-center justify-between mt-4'>
				<div className='flex gap-3'>
					<Link to='/e-commerce/product'>
						<Button variant='outline'>Lanjutkan Belanja</Button>
					</Link>
					{/*<Button variant="default">Lanjutkan Pembayaran</Button>*/}
				</div>

				{items.length > 0 && (
					<button
						className='text-sm text-muted-foreground underline'
						onClick={() => clearCart()}
					>
						Hapus semua
					</button>
				)}
			</div>
		</section>
	);
}
