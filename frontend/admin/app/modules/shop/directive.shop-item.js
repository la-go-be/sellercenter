export function shopItem() {
    "ngInject";
    
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function(event) {
                event.preventDefault();
                
                if ($('.shop-items > li.active')) {
                    $('.shop-items > li.active').removeClass('active');
                }
                $(elem).parent().addClass('active');
                
                scope.shop.getDetail(attrs.shopItem);
            });
        }
    };
}