import type {Product} from "@feature/e-commerce/(child)/product/types";

export const PRODUCTS: Product[] = Array.from({ length: 30 }).map((_, i) => {
    const idx = i + 1
    return {
        id: `p${idx}`,
        name: `Produk ${idx}`,
        price: Math.round((Math.random() * 45000 + 10000) / 2000) * 2000,
        image: `https://picsum.photos/seed/product-${idx}/400/300`,
        description: `Beli produk ${idx}`,
    }
})