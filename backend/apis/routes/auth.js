var authCtrl = require(global.modulePath('auth', 'controller'));

module.exports = [
    {
        verb: 'post',
        endpoint: '/authenticate',
        callback: authCtrl.authenticate
    },
    //{
    //    verb: 'post',
    //    endpoint: '/refreshToken',
    //    callback: authCtrl.refreshToken
    //}
];

/**
 * @swagger
 * Authenticate:
 *   type: object
 *   properties:
 *     email:
 *       type: string
 *     password:
 *       type: string
 */


/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Authenticate'
 *     responses:
 *       200:
 *         description: User profile
 *         schema:
 *           $ref: '#/definitions/UserProfile'
 */