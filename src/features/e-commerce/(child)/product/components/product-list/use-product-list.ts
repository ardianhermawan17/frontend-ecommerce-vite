import { useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from '@feature/e-commerce/(child)/product/data/products.ts'
import type {Product} from "@feature/e-commerce/(child)/product/types";

export function useProductList(initialPage = 1, pageSize = 12) {
    const [page, setPage] = useState<number>(initialPage)
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<Product[]>([])

    const total = PRODUCTS.length
    const pageCount = Math.ceil(total / pageSize)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true)
        const t = setTimeout(() => {
            const start = (page - 1) * pageSize
            setData(PRODUCTS.slice(start, start + pageSize) as Product[])
            setLoading(false)
        }, 1000)

        return () => clearTimeout(t)
    }, [page, pageSize])

    const paginatedProducts = useMemo(() => data, [data])

    const goToPage = (p: number) => {
        const next = Math.max(1, Math.min(pageCount, Math.floor(p)))
        setPage(next)
    }

    const next = () => goToPage(page + 1)
    const prev = () => goToPage(page - 1)

    return {
        products: paginatedProducts,
        page,
        setPage: goToPage,
        next,
        prev,
        pageCount,
        pageSize,
        total,
        loading,
    }
}