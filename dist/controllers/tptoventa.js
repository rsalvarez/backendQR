"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPtoventa = exports.getAllPtoVenta = void 0;
const sequelize_1 = require("sequelize");
const t_pto_venta_1 = __importDefault(require("../models/t_pto_venta"));
const getAllPtoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const retorno = yield t_pto_venta_1.default.findAll({ where: { id: { [sequelize_1.Op.notIn]: [1, 2] } } });
    res.json({ retorno });
});
exports.getAllPtoVenta = getAllPtoVenta;
const getPtoventa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const retorno = yield t_pto_venta_1.default.findByPk(id);
    if (retorno) {
        res.json(retorno);
    }
    else {
        res.status(404).json({
            msg: `No existe un Centro verde con el id ${id}`
        });
    }
});
exports.getPtoventa = getPtoventa;
//# sourceMappingURL=tptoventa.js.map