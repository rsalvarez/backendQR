"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = express_1.Router();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.get('/:nombre', usuarios_1.getUsuarioByNombre);
router.get('/login/:nombre/:password', usuarios_1.getLogin);
exports.default = router;
//# sourceMappingURL=usuario.js.map