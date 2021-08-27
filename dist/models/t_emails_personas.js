"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TEmailsPersona = connection_1.default.define('t_emails_personas', {
    // If TBag't want createdAt
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    }
}, { createdAt: false,
    updatedAt: false
});
exports.default = TEmailsPersona;
//# sourceMappingURL=t_emails_personas.js.map