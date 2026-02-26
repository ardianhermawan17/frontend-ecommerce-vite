import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { renderHook, act } from '@testing-library/react';
import { useCartRecoil } from '@feature/e-commerce/(child)/cart/stores/useCartRecoil';
import type { Cart } from '@feature/e-commerce/(child)/cart/types';

const mockProduct1: Omit<Cart, 'quantity'> = {
	id: 'p1',
	name: 'Product 1',
	price: 10000,
};

const mockProduct2: Omit<Cart, 'quantity'> = {
	id: 'p2',
	name: 'Product 2',
	price: 20000,
};

const mockProduct3: Omit<Cart, 'quantity'> = {
	id: 'p3',
	name: 'Product 3',
	price: 15000,
};

const wrapper = ({ children }: { children: React.ReactNode }) =>
	React.createElement(RecoilRoot, null, children);

describe('useCartRecoil', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	afterEach(() => {
		localStorage.clear();
	});
	describe('Initial State', () => {
		it('should initialize with empty cart items', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			expect(result.current.cartItems).toEqual([]);
			expect(result.current.totalItems).toBe(0);
			expect(result.current.totalPrice).toBe(0);
		});

		it('should have all required methods available', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			expect(typeof result.current.addItem).toBe('function');
			expect(typeof result.current.removeItem).toBe('function');
			expect(typeof result.current.clearCart).toBe('function');
			expect(typeof result.current.setItemQuantity).toBe('function');
		});
	});

	describe('addItem', () => {
		it('should add a single item to empty cart', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1);
			});

			expect(result.current.cartItems).toHaveLength(1);
			expect(result.current.cartItems[0]).toMatchObject({
				id: 'p1',
				name: 'Product 1',
				price: 10000,
				quantity: 1,
			});
		});

		it('should add default quantity of 1 if not specified', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1);
			});

			expect(result.current.cartItems[0].quantity).toBe(1);
		});

		it('should add multiple different items to cart', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1);
				result.current.addItem(mockProduct2, 2);
			});

			expect(result.current.cartItems).toHaveLength(2);
			expect(result.current.cartItems[0].id).toBe('p1');
			expect(result.current.cartItems[1].id).toBe('p2');
			expect(result.current.cartItems[1].quantity).toBe(2);
		});

		it('should increment quantity when adding duplicate item', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2);
				result.current.addItem(mockProduct1, 3);
			});

			expect(result.current.cartItems).toHaveLength(1);
			expect(result.current.cartItems[0].quantity).toBe(5);
		});

		it('should keep unit price unchanged when adding duplicate item', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2);
				result.current.addItem(mockProduct1, 1);
			});

			// Price should remain as unit price, not total price
			expect(result.current.cartItems[0].price).toBe(10000);
			expect(result.current.cartItems[0].quantity).toBe(3);
		});

		it('should handle large quantities', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1000);
			});

			expect(result.current.cartItems[0].quantity).toBe(1000);
			expect(result.current.totalItems).toBe(1000);
		});
	});

	describe('removeItem', () => {
		it('should remove item from cart', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1);
				result.current.addItem(mockProduct2, 2);
			});

			expect(result.current.cartItems).toHaveLength(2);

			act(() => {
				result.current.removeItem('p1');
			});

			expect(result.current.cartItems).toHaveLength(1);
			expect(result.current.cartItems[0].id).toBe('p2');
		});

		it('should remove all occurrences of item', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 5);
			});

			act(() => {
				result.current.removeItem('p1');
			});

			expect(result.current.cartItems).toHaveLength(0);
		});

		it('should handle removing non-existent item gracefully', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1);
				result.current.removeItem('p999');
			});

			expect(result.current.cartItems).toHaveLength(1);
		});

		it('should update totals after removing item', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2);
				result.current.addItem(mockProduct2, 1);
			});

			const initialTotal = result.current.totalPrice;

			act(() => {
				result.current.removeItem('p1');
			});

			expect(result.current.totalPrice).toBeLessThan(initialTotal);
			expect(result.current.totalItems).toBe(1);
		});
	});

	describe('clearCart', () => {
		it('should clear all items from cart', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1);
				result.current.addItem(mockProduct2, 2);
				result.current.addItem(mockProduct3, 3);
			});

			expect(result.current.cartItems).toHaveLength(3);

			act(() => {
				result.current.clearCart();
			});

			expect(result.current.cartItems).toHaveLength(0);
		});

		it('should reset totals to zero after clearing', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 5);
				result.current.addItem(mockProduct2, 3);
			});

			act(() => {
				result.current.clearCart();
			});

			expect(result.current.totalItems).toBe(0);
			expect(result.current.totalPrice).toBe(0);
		});

		it('should work on already empty cart', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.clearCart();
			});

			expect(result.current.cartItems).toHaveLength(0);
		});
	});

	describe('setItemQuantity', () => {
		it('should update item quantity', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2);
			});

			act(() => {
				result.current.setItemQuantity('p1', 5);
			});

			expect(result.current.cartItems[0].quantity).toBe(5);
		});

		it('should remove item when setting quantity to zero', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 3);
				result.current.addItem(mockProduct2, 2);
			});

			act(() => {
				result.current.setItemQuantity('p1', 0);
			});

			expect(result.current.cartItems).toHaveLength(1);
			expect(result.current.cartItems[0].id).toBe('p2');
		});

		it('should remove item when setting quantity to negative', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 5);
			});

			act(() => {
				result.current.setItemQuantity('p1', -1);
			});

			expect(result.current.cartItems).toHaveLength(0);
		});

		it('should handle setting quantity on non-existent item gracefully', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1);
				result.current.setItemQuantity('p999', 5);
			});

			expect(result.current.cartItems).toHaveLength(1);
			expect(result.current.cartItems[0].id).toBe('p1');
		});

		it('should keep unit price unchanged when quantity changes', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2);
			});

			const unitPrice = result.current.cartItems[0].price;

			act(() => {
				result.current.setItemQuantity('p1', 5);
			});

			// Unit price should remain the same, only quantity changes
			expect(result.current.cartItems[0].price).toBe(unitPrice);
			expect(result.current.cartItems[0].price).toBe(10000);
			expect(result.current.cartItems[0].quantity).toBe(5);
		});
	});

	describe('Total Calculations - cartTotalCount', () => {
		it('should calculate total item count correctly with single item', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 5);
			});

			expect(result.current.totalItems).toBe(5);
		});

		it('should calculate total item count correctly with multiple items', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2);
				result.current.addItem(mockProduct2, 3);
				result.current.addItem(mockProduct3, 4);
			});

			expect(result.current.totalItems).toBe(9);
		});

		it('should update total count after removing items', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 5);
				result.current.addItem(mockProduct2, 3);
			});

			act(() => {
				result.current.removeItem('p1');
			});

			expect(result.current.totalItems).toBe(3);
		});

		it('should reset total count to zero on clear', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 10);
				result.current.addItem(mockProduct2, 20);
			});

			act(() => {
				result.current.clearCart();
			});

			expect(result.current.totalItems).toBe(0);
		});

		it('should reflect quantity changes in total', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 5);
				result.current.addItem(mockProduct2, 5);
			});

			expect(result.current.totalItems).toBe(10);

			act(() => {
				result.current.setItemQuantity('p1', 15);
			});

			expect(result.current.totalItems).toBe(20);
		});
	});

	describe('Total Calculations - cartTotalPrice', () => {
		it('should calculate total price correctly with single item', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2);
			});

			expect(result.current.totalPrice).toBe(20000);
		});

		it('should calculate total price correctly with multiple items', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1); // 10000 * 1 = 10000
				result.current.addItem(mockProduct2, 2); // 20000 * 2 = 40000
				result.current.addItem(mockProduct3, 1); // 15000 * 1 = 15000
			});

			// Total: 10000 + 40000 + 15000 = 65000
			expect(result.current.totalPrice).toBe(65000);
		});

		it('should update total price when quantity increases on duplicate add', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 1);
			});

			const firstPrice = result.current.totalPrice;

			act(() => {
				result.current.addItem(mockProduct1, 1);
			});

			expect(result.current.totalPrice).toBe(firstPrice * 2);
		});

		it('should update total price after removing item', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2); // 10000 * 2 = 20000
				result.current.addItem(mockProduct2, 1); // 20000 * 1 = 20000
			});

			const totalBeforeRemove = result.current.totalPrice;

			act(() => {
				result.current.removeItem('p1');
			});

			expect(result.current.totalPrice).toBe(totalBeforeRemove - 20000);
		});

		it('should reset total price to zero on clear', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 5);
				result.current.addItem(mockProduct2, 10);
			});

			act(() => {
				result.current.clearCart();
			});

			expect(result.current.totalPrice).toBe(0);
		});

		it('should update total price when item quantity changes', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 5);
			});

			const initialPrice = result.current.totalPrice;

			act(() => {
				result.current.setItemQuantity('p1', 10);
			});

			expect(result.current.totalPrice).toBe(initialPrice * 2);
		});

		it('should handle zero price items', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });
			const freeProduct: Omit<Cart, 'quantity'> = {
				id: 'free',
				name: 'Free Item',
				price: 0,
			};

			act(() => {
				result.current.addItem(freeProduct, 10);
			});

			expect(result.current.totalPrice).toBe(0);
		});
	});

	describe('Complex Scenarios', () => {
		it('should handle multiple operations in sequence', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 2);
				result.current.addItem(mockProduct2, 1);
			});

			expect(result.current.totalItems).toBe(3);
			expect(result.current.totalPrice).toBe(40000);

			act(() => {
				result.current.addItem(mockProduct1, 1);
			});

			expect(result.current.totalItems).toBe(4);
			expect(result.current.totalPrice).toBe(50000);

			act(() => {
				result.current.setItemQuantity('p1', 1);
			});

			expect(result.current.totalItems).toBe(2);
			expect(result.current.totalPrice).toBe(30000);

			act(() => {
				result.current.removeItem('p2');
			});

			expect(result.current.totalItems).toBe(1);
			expect(result.current.totalPrice).toBe(10000);
		});

		it('should maintain cart integrity through various operations', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 3);
				result.current.addItem(mockProduct2, 2);
				result.current.addItem(mockProduct3, 1);
			});

			const cartBefore = result.current.cartItems.length;

			act(() => {
				result.current.setItemQuantity('p2', 0);
			});

			expect(result.current.cartItems.length).toBe(cartBefore - 1);

			act(() => {
				result.current.addItem(mockProduct2, 5);
			});

			expect(result.current.cartItems.length).toBe(3);
		});

		it('should properly sync cart items with totals', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				result.current.addItem(mockProduct1, 10);
				result.current.addItem(mockProduct2, 10);
			});

			const cartTotalFromAdd = result.current.cartItems.reduce(
				(sum, item) => sum + item.quantity,
				0,
			);
			expect(result.current.totalItems).toBe(cartTotalFromAdd);

			const priceTotalFromAdd = result.current.cartItems.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0,
			);
			expect(result.current.totalPrice).toBe(priceTotalFromAdd);
		});

		it('should handle rapid successive operations', () => {
			const { result } = renderHook(() => useCartRecoil(), { wrapper });

			act(() => {
				for (let i = 0; i < 10; i++) {
					result.current.addItem(mockProduct1, 1);
				}
			});

			expect(result.current.cartItems[0].quantity).toBe(10);

			// Each setItemQuantity call needs to be in its own act() to ensure state updates
			act(() => {
				result.current.setItemQuantity('p1', 9);
			});

			act(() => {
				result.current.setItemQuantity('p1', 8);
			});

			act(() => {
				result.current.setItemQuantity('p1', 7);
			});

			act(() => {
				result.current.setItemQuantity('p1', 6);
			});

			act(() => {
				result.current.setItemQuantity('p1', 5);
			});

			expect(result.current.cartItems[0].quantity).toBe(5);
		});
	});
});
