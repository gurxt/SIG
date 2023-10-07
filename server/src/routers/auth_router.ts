import { createUser } from '#/controllers/user_controller';
import { validate } from '#/middleware/validator';
import { CreateUserSchema } from '#/util/validation';
import { Router } from 'express';

const router = Router();

router.post('/create', validate(CreateUserSchema), createUser);

export default router;