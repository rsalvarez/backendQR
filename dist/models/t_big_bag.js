"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const t_personas_1 = __importDefault(require("./t_personas"));
const TBag = connection_1.default.define('t_bolsas', {
    // If TBag't want createdAt
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    img_qr: {
        type: sequelize_1.DataTypes.STRING
    },
    estado_actual: {
        type: sequelize_1.DataTypes.STRING
    },
    usuario_cambio_estado: {
        type: sequelize_1.DataTypes.STRING
    },
    t_pto_venta_actual: {
        type: sequelize_1.DataTypes.INTEGER
    },
    t_personas_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fecha_cambio_estado: {
        type: sequelize_1.DataTypes.DATE
    },
    usuario_alta: {
        type: sequelize_1.DataTypes.STRING
    }
}, { createdAt: false,
    updatedAt: false
});
const newLocal = 'ecoaliado';
TBag.belongsTo(t_personas_1.default, {
    foreignKey: { name: 't_personas_id' },
    as: newLocal
});
//TPersona.findByPk(TBag.t_personas_id);
exports.default = TBag;
//# sourceMappingURL=t_big_bag.js.map