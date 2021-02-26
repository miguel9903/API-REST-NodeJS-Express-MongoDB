const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');

const multipart = require('connect-multiparty');
const multiplartMiddleware = multipart({ uploadDir: './uploads' });

// Projects
router.get('/projects', projectController.getProjects);
router.get('/project/:id', projectController.getProject);
router.post('/projects/save-project', projectController.saveProject);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);

// Upload images
router.post('/upload-image/:id', multiplartMiddleware, projectController.uploadImage);

module.exports = router;