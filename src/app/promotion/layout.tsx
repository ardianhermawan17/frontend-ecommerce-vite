import {Outlet} from "react-router";
import {PromotionHeader} from "@feature/promotion/components/promotion-header";


export default function PromotionLayout() {
    return(
        <>
            <PromotionHeader/>
            <div className="pt-16">
                <Outlet />
            </div>
        </>
    )
}