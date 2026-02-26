import { X, Search } from 'lucide-react';
import { Input } from '@shared/components/ui/input';
import { useProductSearch } from '@feature/e-commerce/(child)/product/components/product-search/use-product-search';
import type { ProductSearchProps } from '@feature/e-commerce/(child)/product/components/product-search/types';

export const ProductSearch = ({ onSearchChange }: ProductSearchProps) => {
	const { localQuery, handleInputChange, handleClear } = useProductSearch({onSearchChange});

	return (
		<div className='w-full max-w-6xl mx-auto px-4 mb-6'>
			<div className='relative'>
				<div className='flex items-center gap-2'>
					<div className='flex-1 relative'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none' />
						<Input
							type='text'
							placeholder='Cari produk...'
							value={localQuery}
							onChange={handleInputChange}
							className='pl-10 pr-10 py-2 w-full'
						/>
						{localQuery && (
							<button
								onClick={handleClear}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
								aria-label='Clear search'
							>
								<X className='w-5 h-5' />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
