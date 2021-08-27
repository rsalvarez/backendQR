"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const t_emails_personas_1 = __importDefault(require("./t_emails_personas"));
//import TBag from './t_big_bag';
const TPersona = connection_1.default.define('t_personas', {
    // If don't want createdAt
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING
    }
}, { createdAt: false,
    updatedAt: false
});
const newLocal = 'emails';
TPersona.hasMany(t_emails_personas_1.default, {
    foreignKey: { name: 't_persona_id' },
    as: newLocal
});
exports.default = TPersona;
//# sourceMappingURL=t_personas.js.map