import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import type {ProductSearchProps} from "@feature/e-commerce/(child)/product/components/product-search/types.ts";

type useProductSearchProps = {
	onSearchChange: ProductSearchProps['onSearchChange'];
	debounceMs?: number;
}
export function useProductSearch({onSearchChange, debounceMs = 300}: useProductSearchProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [localQuery, setLocalQuery] = useState<string>(
		searchParams.get('q') || '',
	);
	const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();

	// Get search query from URL
	const searchQuery = searchParams.get('q') || '';

	const handleSearch = useCallback(
		(query: string) => {
			setLocalQuery(query);

			// Clear previous debounce timer
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			// Set new debounce timer
			debounceTimerRef.current = setTimeout(() => {
				if (query.trim() === '') {
					// Remove query param if empty
					setSearchParams((prev) => {
						const params = new URLSearchParams(prev);
						params.delete('q');
						// Reset to page 1 when searching
						params.set('page', '1');
						return params;
					});
				} else {
					// Set query param and reset to page 1
					setSearchParams((prev) => {
						const params = new URLSearchParams(prev);
						params.set('q', query);
						params.set('page', '1');
						return params;
					});
				}
			}, debounceMs);
		},
		[debounceMs, setSearchParams],
	);

	const handleClear = useCallback(() => {
		setLocalQuery('');
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			params.delete('q');
			params.set('page', '1');
			return params;
		});
	}, [setSearchParams]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		handleSearch(query);
		onSearchChange?.(query);
	};

	// Sync local query with URL when URL changes
	useEffect(() => {
		setLocalQuery(searchQuery);
	}, [searchQuery]);

	// Cleanup debounce timer on unmount
	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	return {
		searchQuery,
		localQuery,
		handleInputChange,
		handleClear,
	};
}
