import { Router } from 'express';
import auth from './auth';
import suppliers from './suppliers';
import products from './products';
import orders from './orders';
import customers from './customers';
import support from './support';

const router = Router();

router.use('/auth', auth);
router.use('/suppliers', suppliers);
router.use('/products', products);
router.use('/orders', orders);
router.use('/customers', customers);
router.use('/support', support);

export default router;
