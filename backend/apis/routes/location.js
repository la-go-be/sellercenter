var locationCtrl = require(global.modulePath('location', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/location/provinces',
        callback: locationCtrl.getProvinces
    },
    {
        verb: 'get',
        endpoint: '/location/amphurs',
        callback: locationCtrl.getAmphurs
    },
    {
        verb: 'get',
        endpoint: '/location/districts',
        callback: locationCtrl.getDistricts
    },
];

/**
 * @swagger
 * LocationFieldItems:
 *   type: array
 *   items:
 *     type: string
 */


/**
 * @swagger
 * /location/provinces:
 *   get:
 *     tags:
 *       - Location
 *     summary: Get province items
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: zipcode
 *         description: Zip code
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Province items
 *         schema:
 *           $ref: '#/definitions/LocationFieldItems'
 */

/**
 * @swagger
 * /location/amphurs:
 *   get:
 *     tags:
 *       - Location
 *     summary: Get amphur items
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: zipcode
 *         description: Zip code
 *         in: query
 *         required: true
 *         type: string
 *       - name: province
 *         description: Province
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Amphur items
 *         schema:
 *           $ref: '#/definitions/LocationFieldItems'
 */

/**
 * @swagger
 * /location/districts:
 *   get:
 *     tags:
 *       - Location
 *     summary: Get district items
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: zipcode
 *         description: Zip code
 *         in: query
 *         required: true
 *         type: string
 *       - name: province
 *         description: Province
 *         in: query
 *         required: true
 *         type: string
 *       - name: amphur
 *         description: Amphur
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: District items
 *         schema:
 *           $ref: '#/definitions/LocationFieldItems'
 */