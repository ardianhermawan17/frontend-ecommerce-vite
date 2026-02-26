import React from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from '@shared/components/ui/card';
import { Button } from '@shared/components/ui/button';
import { useProduct } from '@feature/e-commerce/(child)/product/components/product-item/use-product-item.ts';
import type { Product } from '@feature/e-commerce/(child)/product/types';
import { convertCurrency } from '@shared/utils';

interface ProductItemInnerProps {
	product: Product;
}

function ProductItemInner({ product }: ProductItemInnerProps) {
	const { handleAddToCart } = useProduct(product);

	return (
		<Card className='overflow-hidden'>
			<div className='aspect-[4/3] w-full bg-muted overflow-hidden'>
				<img
					src={product.image}
					alt={product.name}
					loading='lazy'
					className='object-cover w-full h-full'
				/>
			</div>

			<CardHeader>
				<h3 className='text-sm text-center md:text-left font-medium'>
					{product.name}
				</h3>
			</CardHeader>

			<CardContent>
				<p className='text-sm text-center md:text-left text-muted-foreground'>
					{product.description}
				</p>
			</CardContent>

			<CardFooter className='flex flex-col sm:flex-row items-center gap-2 sm:justify-between'>
				<div className='text-sm font-semibold min-w-0'>
					<span className='truncate block'>
						{convertCurrency(product.price, 'indonesia')}
					</span>
				</div>

				<Button
					onClick={() => handleAddToCart(1)}
					size='sm'
					variant='default'
					className='w-full sm:w-auto whitespace-normal break-words py-6 md:py-4 text-center'
				>
					Tambah ke Keranjang
				</Button>
			</CardFooter>
		</Card>
	);
}

export const ProductItem = React.memo(ProductItemInner);
