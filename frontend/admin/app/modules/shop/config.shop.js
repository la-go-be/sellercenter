export function shopConfig($stateProvider){
    "ngInject";

    $stateProvider
        .state("shop", {
            url: '/shop',
            templateUrl: "assets/templates/shop/shop.html",
            controller: "ShopController",
            controllerAs: "shop",
            data: {
                css: "assets/css/shop.css"
            }
        });
};