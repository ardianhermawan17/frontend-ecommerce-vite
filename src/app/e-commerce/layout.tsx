import {Outlet} from "react-router";
import {ECommerceHeader} from "@feature/e-commerce/components/e-commerce-header";


export default function ECommerceLayout() {
    return(
        <>
            <ECommerceHeader
                cartItems={[
                    { id: "1", name: "Produk A", qty: 2, price: 30000 },
                    { id: "2", name: "Produk B", qty: 1, price: 15000 }
                ]}
            />

            <div className="pt-16">
                <Outlet />
            </div>
        </>
    )
}