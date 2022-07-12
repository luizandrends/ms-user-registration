import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/user.routes';

const router = Router();

router.use('/users', userRouter);

export default router;
