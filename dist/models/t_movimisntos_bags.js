"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//id, t_bag_id, cantidad_kg, t_pto_venta_destino, usuario_alta, fecha_alta, notificado
const TMovimientoBag = connection_1.default.define('t_movimientos_bolsas', {
    // If TBag't want createdAt
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    t_bag_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cantidad_kg: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    t_pto_venta_destino: {
        type: sequelize_1.DataTypes.NUMBER
    },
    usuario_alta: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha_alta: {
        type: sequelize_1.DataTypes.DATE
    },
    notificado: {
        type: sequelize_1.DataTypes.CHAR
    }
}, { createdAt: false,
    updatedAt: false
});
//const newLocal = 'ecoaliado';
//TBag.belongsTo(TPersona , {
//    foreignKey :{ name :  't_personas_id' },
//    as : newLocal
//});
//TPersona.findByPk(TBag.t_personas_id);
exports.default = TMovimientoBag;
//# sourceMappingURL=t_movimisntos_bags.js.map