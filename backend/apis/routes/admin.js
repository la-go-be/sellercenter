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

/**
 * @swagger
 * definition:
 *   AdminShopItems:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         shopID:
 *           type: number
 *         shopName:
 *           type: string
 *   AdminShopDetail:
 *     type: object
 *     properties:
 *       store:
 *         type: object
 *         properties:
 *           storeName:
 *             type: string
 *           businessType:
 *             type: string
 *           individual:
 *             type: object
 *             properties:
 *               register:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   citizenID:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   lineID:
 *                     type: string
 *                   email:
 *                     type: string
 *                   facebook:
 *                     type: string
 *               contact:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   citizenID:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   lineID:
 *                     type: string
 *                   email:
 *                     type: string
 *                   facebook:
 *                     type: string
 *               document:
 *                 type: object
 *                 properties:
 *                   citizenCard:
 *                     type: string
 *                   homeRegister:
 *                     type: string
 *           company:
 *             type: object
 *             properties:
 *               register:
 *                 type: object
 *                 properties:
 *                   companyPrefixName:
 *                     type: string
 *                   companyName:
 *                     type: string
 *                   taxID:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   lineID:
 *                     type: string
 *                   email:
 *                     type: string
 *                   facebook:
 *                     type: string
 *               contact:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   citizenID:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   lineID:
 *                     type: string
 *                   email:
 *                     type: string
 *                   facebook:
 *                     type: string
 *               document:
 *                 type: object
 *                 properties:
 *                   companyCertificate:
 *                     type: string
 *                   tradeRegister:
 *                     type: string          
 *       bank:
 *         type: object
 *         properties:
 *           bankName:
 *             type: string
 *           bankBranch:
 *             type: string
 *           accountNumber:
 *             type: string
 *           accountType:
 *             type: string
 *           accountName:
 *             type: string
 *       address:
 *         type: object
 *         properties:
 *           pickup:
 *             type: object
 *             properties:
 *               zipCode:
 *                 type: string
 *               province:
 *                 type: string
 *               amphur:
 *                 type: string
 *               district:
 *                 type: string
 *               other:
 *                 type: string
 *           documentDrop:
 *             type: object
 *             properties:
 *               zipCode:
 *                 type: string
 *               province:
 *                 type: string
 *               amphur:
 *                 type: string
 *               district:
 *                 type: string
 *               other:
 *                 type: string
 */


/**
 * @swagger
 * /admin/shops/list:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get shop items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Shop items
 *         schema:
 *           $ref: '#/definitions/AdminShopItems'
 */

/**
 * @swagger
 * /admin/shops/detail/{shopID}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get shop detail by shop ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: shopID
 *         description: Shop ID
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Shop detail
 *         schema:
 *           $ref: '#/definitions/AdminShopDetail'
 *           
 */