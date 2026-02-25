import {Outlet} from "react-router";
import {PromotionHeader} from "@feature/promotion/components/promotion-header";


export default function PromotionLayout() {
    return(
        <>
            <PromotionHeader/>
            <div className="pt-14">
                <Outlet />
            </div>
        </>
    )
}