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
exports.getUsuarioByNombre = exports.getLogin = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
//import { DataTypes } from 'sequelize';
const sequelize_1 = require("sequelize");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const nombre = req.params.nombre;
    const password = req.params.password;
    let comparador = "";
    yield ((_a = usuario_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query("SELECT login_ext( '" + nombre + "', '" + password + "') as resultado", { type: sequelize_1.QueryTypes.SELECT }).then((pass) => {
        const data = JSON.parse(JSON.stringify(pass[0]));
        comparador = data.resultado;
    }));
    //console.log(comparador.toString() );
    if (comparador.toString() != "NON") {
        const usuario = yield usuario_1.default.findAll({
            where: {
                nombre: nombre,
                estado: 'A'
            }
        });
        res.json({ usuario: usuario, resultado: 'OK' });
    }
    else {
        res.json({ usuario: null, resultado: 'NO' });
    }
});
exports.getLogin = getLogin;
const getUsuarioByNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.params.nombre;
    try {
        const existeUsr = yield usuario_1.default.findOne({
            where: {
                nombre: nombre.toLowerCase()
            }
        });
        if (!existeUsr) {
            return res.status(400).json({
                msg: 'No existe un usuario con el nombre ' + nombre
            });
        }
        res.json(existeUsr);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador ' + error
        });
    }
});
exports.getUsuarioByNombre = getUsuarioByNombre;
//# sourceMappingURL=usuarios.js.map