import { CartList } from '@feature/e-commerce/(child)/cart/components/cart-list/cart-list.tsx';
import { CartSummary } from '@feature/e-commerce/(child)/cart/components/cart-summary/cart-summary.tsx';
import { CartSelectAll } from "@feature/e-commerce/(child)/cart/components/cart-select-all";

export default function Page() {
	return (
		<main className='pt-20 pb-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-2xl font-semibold mb-6'>Keranjang Pesananmu</h2>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					<div className='lg:col-span-2 space-y-4'>
                        <CartSelectAll />
						<CartList />
					</div>

					<aside className='lg:col-span-1'>
						<CartSummary />
					</aside>
				</div>
			</div>
		</main>
	);
}
