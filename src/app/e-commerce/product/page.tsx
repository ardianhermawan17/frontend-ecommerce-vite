import {ProductList} from "@feature/e-commerce/(child)/product/components/product-list";

export default function Page() {
    return (
        <main className="pt-20 pb-12">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-semibold mb-4">Produk</h2>
                <ProductList />
            </div>
        </main>
    )
}