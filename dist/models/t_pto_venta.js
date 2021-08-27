"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TPtoVenta = connection_1.default.define('t_pto_venta', {
    // If don't want createdAt
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    calle: {
        type: sequelize_1.DataTypes.STRING
    },
    numero: {
        type: sequelize_1.DataTypes.STRING
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    ip: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre_db: {
        type: sequelize_1.DataTypes.STRING
    },
    puerto: {
        type: sequelize_1.DataTypes.STRING
    }
}, { createdAt: false,
    updatedAt: false
});
exports.default = TPtoVenta;
//# sourceMappingURL=t_pto_venta.js.map