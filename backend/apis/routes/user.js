var userCtrl = require(global.modulePath('user', 'controller'));

module.exports = [
    {
        verb: 'post',
        endpoint: '/users',
        callback: userCtrl.create
    }
];

/**
 * @swagger
 * definition:
 *   UserInfo:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       phone:
 *         type: string
 *   UserProfile:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       email:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       phone:
 *         type: string
 */


/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
 *     summary: Add new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userInfo
 *         description: User information
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserInfo'
 *     responses:
 *       200:
 *         description: User profile
 *         schema:
 *           $ref: '#/definitions/UserProfile'
 */