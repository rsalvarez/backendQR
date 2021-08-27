import { Router } from 'express';
import { getBag ,setDatosBug ,setStatus , setEstadoNotifBag} from '../controllers/tbigbag';

const router = Router();

router.get('/:id',    getBag );
router.get('/setEstadoNotifBag/:id',  setEstadoNotifBag);
router.put('/setDatosBug/',  setDatosBug);
router.put('/setStatusBag/',  setStatus);



export default router;