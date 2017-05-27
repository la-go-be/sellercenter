var companyCtrl = require(global.modulePath('company', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/companies/prefixes',
        callback: companyCtrl.getCompanyPrefixes
    }
];

/**
 * @swagger
 * CompanyPrefixItems:
 *   type: array
 *   items:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 */


/**
 * @swagger
 * /companies/prefixes:
 *   get:
 *     tags:
 *       - Company
 *     summary: Get company prefix items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Company prefix items
 *         schema:
 *           $ref: '#/definitions/CompanyPrefixItems'
 */