import { createUser, verifyEmail } from '#/controllers/user_controller';
import { validate } from '#/middleware/validator';
import { CreateUserSchema, EmailVerificationSchema } from '#/util/validation';
import { Router } from 'express';

const router = Router();

router.post('/create', validate(CreateUserSchema), createUser);
router.post('/verify-email', validate(EmailVerificationSchema), verifyEmail);

export default router;