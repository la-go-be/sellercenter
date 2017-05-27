var awsS3Ctrl = require(global.modulePath('aws-s3', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/awsS3/url',
        callback: awsS3Ctrl.getSignedUrl
    },
    {
        verb: 'post',
        endpoint: '/awsS3/upload/:userAccountID',
        callback: awsS3Ctrl.uploadFile
    }
];

/**
 * @swagger
 * AWSS3URL:
 *   type: object
 *   properties:
 *     awsS3URL:
 *       type: string
 * AWSS3Upload:
 *   type: object
 *   properties:
 *     awsS3URL:
 *       type: string
 *     awsS3Key:
 *       type: string
 */


/**
 * @swagger
 * /awsS3/url:
 *   get:
 *     tags:
 *       - AWS S3
 *     summary: Get AWS S3 signed url
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: awsS3Key
 *         description: AWS S3 Key
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: AWS S3 signed url
 *         schema:
 *           $ref: '#/definitions/AWSS3URL'
 */

/**
 * @swagger
 * /awsS3/upload/{userAccountID}:
 *   post:
 *     tags:
 *       - AWS S3
 *     summary: Upload a file to AWS S3
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userAccountID
 *         description: User account ID
 *         in: path
 *         required: true
 *         type: integer
 *       - name: documentName
 *         description: Document name
 *         in: query
 *         required: true
 *         type: string
 *       - name: file
 *         description: File
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: AWS S3 Upload 
 *         schema:
 *           $ref: '#/definitions/AWSS3Upload'
 */