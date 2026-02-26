import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PRODUCTS } from '@feature/e-commerce/(child)/product/data/products.ts';
import type { Product } from '@feature/e-commerce/(child)/product/types';

export function useProductList(pageSize = 12) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<Product[]>([]);

	// Get current page from URL query params, default to 1
	const currentPage = Math.max(
		1,
		parseInt(searchParams.get('page') || '1', 10),
	);

	const total = PRODUCTS.length;
	const pageCount = Math.ceil(total / pageSize);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setLoading(true);
		const t = setTimeout(() => {
			const start = (currentPage - 1) * pageSize;
			setData(PRODUCTS.slice(start, start + pageSize) as Product[]);
			setLoading(false);
		}, 1000);

		return () => clearTimeout(t);
	}, [currentPage, pageSize]);

	const paginatedProducts = useMemo(() => data, [data]);

	const goToPage = (p: number) => {
		const next = Math.max(1, Math.min(pageCount, Math.floor(p)));
		setSearchParams({ page: next.toString() });
	};

	const next = () => goToPage(currentPage + 1);
	const prev = () => goToPage(currentPage - 1);

	return {
		products: paginatedProducts,
		page: currentPage,
		setPage: goToPage,
		next,
		prev,
		pageCount,
		pageSize,
		total,
		loading,
	};
}
