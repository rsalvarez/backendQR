import { Router } from 'express';
import { getAllPtoVenta, getPtoventa } from '../controllers/tptoventa';


const router = Router();


router.get('/',       getAllPtoVenta );
router.get('/:id',    getPtoventa );

export default router;