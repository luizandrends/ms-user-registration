import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default router;
