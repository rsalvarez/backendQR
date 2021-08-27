"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tbigbag_1 = require("../controllers/tbigbag");
const router = express_1.Router();
router.get('/:id', tbigbag_1.getBag);
router.get('/setEstadoNotifBag/:id', tbigbag_1.setEstadoNotifBag);
router.put('/setDatosBug/', tbigbag_1.setDatosBug);
router.put('/setStatusBag/', tbigbag_1.setStatus);
exports.default = router;
//# sourceMappingURL=tbigbag.js.map