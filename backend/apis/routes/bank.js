var bankCtrl = require(global.modulePath('bank', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/banks',
        callback: bankCtrl.getBanks
    }
];

/**
 * @swagger
 * definition:
 *   BankItems:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */


/**
 * @swagger
 * /banks:
 *   get:
 *     tags:
 *       - Bank
 *     summary: Get bank items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Bank items
 *         schema:
 *           $ref: '#/definitions/BankItems'
 */