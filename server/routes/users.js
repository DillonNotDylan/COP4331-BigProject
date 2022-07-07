import express from 'express';

import { authenticate, finish } from '../middleware/auth.js';

import {
	signup,
	signin,
	signout,
	verifyEmail,
	resendVerificationEmail,
	tryReset,
	resetPassword,
} from '../controllers/users.js';

import {
	uploadProject,
	updateProject,
	deleteProject,
	searchProjects,
	getProject,
	getProjects,
	getProjectTitles,
} from '../controllers/projects.js';

const router = express.Router();

router.post('/validate-access', authenticate, finish);

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);
router.post('/try-reset', tryReset);
router.post('/reset-password', resetPassword);

router.post('/upload-project', authenticate, uploadProject);
router.post('/update-project', authenticate, updateProject);
router.post('/delete-project', authenticate, deleteProject);
router.post('/search-projects', authenticate, searchProjects);
router.post('/get-project', authenticate, getProject);
router.post('/get-projects', authenticate, getProjects);
router.post('/get-project-titles', authenticate, getProjectTitles);

export default router;