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
    }
];

/**
 * @swagger
 * definition:
 *   ShopDetail:
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
 *               isContactSameRegister:
 *                 type: boolean
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
 *                   companyPrefix:
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
 *           bankID:
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
 *           isDocumentDropSamePickup:
 *             type: boolean
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
 *   ShopResultSuccess:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *                 
 */


/**
 * @swagger
 * /shops/user/{userAccountID}:
 *   get:
 *     tags:
 *       - Shop
 *     summary: Get shop detail by user account ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userAccountID
 *         description: User account ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Shop detail
 *         schema:
 *           $ref: '#/definitions/ShopDetail'
 *           
 */

/**
 * @swagger
 * /shops/user/{userAccountID}:
 *   put:
 *     tags:
 *       - Shop
 *     summary: Add or update shop detail by user account ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userAccountID
 *         description: User account ID
 *         in: path
 *         required: true
 *         type: integer
 *       - name: shopDetail
 *         description: Shop detail
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ShopDetail'
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/ShopResultSuccess'
 */