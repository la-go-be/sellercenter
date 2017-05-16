var config = require('config');
var models = require(global.modulePath('', 'model'));
var sequelize = models.sequelize;
var Shop = models.Shop;

module.exports = {
    getShopItems,
    getShopDetail
}

function getShopItems(req, res) {
    var _Shop = Shop.build();
    
    _Shop.getItems().then(function(shop) {
        res.status(200).json(shop);
    });
}

function getShopDetail(req, res) {
    var shopID = req.params.shopID;

    var _Shop = Shop.build();
    
    _Shop.getSummaryByID(shopID).then(function(shop) {
        res.status(200).json(shop);
    });
}