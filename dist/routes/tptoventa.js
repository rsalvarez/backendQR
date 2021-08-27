"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tptoventa_1 = require("../controllers/tptoventa");
const router = express_1.Router();
router.get('/', tptoventa_1.getAllPtoVenta);
router.get('/:id', tptoventa_1.getPtoventa);
exports.default = router;
//# sourceMappingURL=tptoventa.js.map