import { Router } from 'express';
import { getRoles, addRole } from '../controllers/roleController.js';

const router = Router();

router.get('/', getRoles);
router.post('/', addRole);

export default router;