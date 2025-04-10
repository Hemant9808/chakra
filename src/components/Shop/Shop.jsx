import React from "react";
import DiscountBanner from "./ShopComponents/DiscountBanner";
import MarqueeBanner from "./ShopComponents/MarqueeBanner";
import ProductTabs from "./ShopComponents/ProductTabs";


function Shop(){
    return (
        <div>
            <MarqueeBanner />
            <DiscountBanner />
            <ProductTabs />
        </div>
      )
}

export default Shop