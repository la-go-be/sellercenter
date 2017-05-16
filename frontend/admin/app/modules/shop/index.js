import {shopConfig} from "./config.shop";
import {ShopController} from "./controller.shop";
import {shopService} from "./service.shop";
import {shopPage} from "./directive.shop-page";
import {shopItem} from "./directive.shop-item";

angular.module("Shop")
    .config(shopConfig)
    .controller("ShopController", ShopController)
    .factory("shopService", shopService)
    .directive("shopPage", shopPage)
    .directive("shopItem", shopItem);