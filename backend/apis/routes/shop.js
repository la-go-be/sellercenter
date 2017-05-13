var shopCtrl = require(global.modulePath('shop', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/shops/user/:userAccountID',
        callback: shopCtrl.getByUserAccountID
    },
    {
        verb: 'put',
        endpoint: '/shops/user/:userAccountID',
        callback: shopCtrl.createOrUpdateByUserAccountID
    },
    {
        verb: 'get',
        endpoint: '/shops/user2/:userAccountID',
        callback: shopCtrl.getByUserAccountID2
    },
];