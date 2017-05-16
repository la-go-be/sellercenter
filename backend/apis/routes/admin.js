var adminCtrl = require(global.modulePath('admin', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/admin/shops/list',
        callback: adminCtrl.getShopItems
    },
    {
        verb: 'get',
        endpoint: '/admin/shops/detail/:shopID',
        callback: adminCtrl.getShopDetail
    }
];