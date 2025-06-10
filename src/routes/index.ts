import { Router } from 'express';
import { getCodeDetail, getIndex } from '../controllers/indexController.js';
import { getCategoryCodes} from '../controllers/categoryController.js';
const router: Router = Router();

router.get('/', getIndex);
router.get('/categories', getCategoryCodes);
router.get('/code/:code', getCodeDetail);


export default router;
