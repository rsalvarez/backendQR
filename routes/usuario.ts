import { Router } from 'express';
import { getUsuario, getUsuarios, getUsuarioByNombre,getLogin } from '../controllers/usuarios';


const router = Router();


router.get('/',       getUsuarios );
router.get('/:id',    getUsuario );
router.get('/:nombre',  getUsuarioByNombre );
router.get('/login/:nombre/:password',  getLogin );

export default router;