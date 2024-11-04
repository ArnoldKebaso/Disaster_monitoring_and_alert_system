const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/uploadMiddleware');


/**
 * @swagger
 * /:
 *   post:
 *     summary: Upload a file
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalName:
 *                   type: string
 *                   example: "document.pdf"
 *                 fileName:
 *                   type: string
 *                   example: "1634307819089-document.pdf"
 *                 mimeType:
 *                   type: string
 *                   example: "application/pdf"
 *                 size:
 *                   type: integer
 *                   example: 204800
 *                 destination:
 *                   type: string
 *                   example: "uploads/"
 *       400:
 *         description: Bad request - Invalid file upload or format
 */
router.post('/', uploadMiddleware, (req, res) => {
  if (!req.fileInfo) {
    return res.status(400).json({ error: 'File upload failed' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    fileInfo: req.fileInfo,
  });
});

module.exports = router;
