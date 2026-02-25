import {useProductList} from "@feature/e-commerce/(child)/product/components/product-list/use-product-list.ts";
import {ProductItem} from "@feature/e-commerce/(child)/product/components/product-item";
import {CustomPagination} from "@shared/components/template/custom-pagination";
import {ProductItemLoading} from "@feature/e-commerce/(child)/product/components/product-item/product-item-loading.tsx";

export const ProductList = ({
    initialPage = 1,
    pageSize = 12,
}: {
    initialPage?: number
    pageSize?: number
}) => {
    const { products, page, setPage, pageCount, loading } = useProductList(
        initialPage,
        pageSize,
    )
    return (
        <section className="w-full max-w-6xl mx-auto px-4">
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {loading
                    ? Array.from({ length: pageSize }).map((_, i) => (
                        <ProductItemLoading key={i} />
                    ))
                    : products.map((p) => <ProductItem key={p.id} product={p} />)}
            </div>

            <CustomPagination
                page={page}
                pageCount={pageCount}
                setPage={setPage}
            />
        </section>
    )
}

