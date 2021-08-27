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
exports.setDatosBug = exports.setStatus = exports.setEstadoNotifBag = exports.getBag = void 0;
const t_big_bag_1 = __importDefault(require("../models/t_big_bag"));
const t_movimisntos_bags_1 = __importDefault(require("../models/t_movimisntos_bags"));
const t_personas_1 = __importDefault(require("../models/t_personas"));
const t_pto_venta_1 = __importDefault(require("../models/t_pto_venta"));
const getBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const retorno = yield t_big_bag_1.default.findByPk(id, { include: "ecoaliado" });
    res.json({ retorno });
});
exports.getBag = getBag;
const setEstadoNotifBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("setEstadoNotifBag");
    console.log(req.params);
    const bag = yield t_movimisntos_bags_1.default.update({
        notificado: 'S'
    }, {
        where: {
            id: id
        }
    }).then((resultado) => __awaiter(void 0, void 0, void 0, function* () {
        res.json({
            resultado: 'OK'
        });
    })).catch((err) => {
        res.json({
            resultado: 'NOK'
        });
    });
});
exports.setEstadoNotifBag = setEstadoNotifBag;
const setStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let estado_calc = '';
    estado_calc = 'EN_ECO';
    const bag = yield t_big_bag_1.default.update({
        fecha_cambio_estado: new Date(),
        usuario_cambio_estado: req.query.usuario,
        estado_actual: estado_calc
    }, {
        where: {
            id: req.query.idBag
        }
    }).then((resultado) => __awaiter(void 0, void 0, void 0, function* () {
        let idBag = req.query.idBag;
        const bolsa = yield t_big_bag_1.default.findByPk(idBag, { include: "ecoaliado" });
        const row = JSON.stringify(bolsa);
        const bol = JSON.parse(row);
        res.json({
            resultado: 'OK',
            bag: resultado
        });
    })).catch((err) => {
        res.json({
            resultado: 'NOK',
            error: "No se pudo registrar el movimiento => " + JSON.stringify(err)
        });
    });
});
exports.setStatus = setStatus;
const setDatosBug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const movimeinto = t_movimisntos_bags_1.default.build({
        t_bag_id: req.query.idBag,
        cantidad_kg: req.query.kg,
        t_pto_venta_destino: req.query.ptoVenta,
        usuario_alta: req.query.usuario,
        fecha_alta: new Date(),
        notificado: 'N'
    });
    //    console.log(movimeinto);
    let estado_calc = '';
    if (((_a = req.query.estado_actual) === null || _a === void 0 ? void 0 : _a.toString()) == "EN_CV")
        estado_calc = 'EN_ECO';
    else
        estado_calc = 'EN_CV';
    movimeinto.save().then((resultado) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const bag = yield t_big_bag_1.default.update({
            fecha_cambio_estado: new Date(),
            usuario_cambio_estado: req.query.usuario,
            estado_actual: estado_calc
        }, {
            where: {
                id: req.query.idBag
            }
        });
        let idBag = req.query.idBag;
        const bolsa = yield t_big_bag_1.default.findByPk(idBag, { include: "ecoaliado" });
        const row = JSON.stringify(bolsa);
        const bol = JSON.parse(row);
        //console.log(bol.t_personas_id);
        const ecoaliado = yield t_personas_1.default.findByPk(bol.t_personas_id, { include: "emails" });
        const filaEco = JSON.stringify(ecoaliado);
        const ffilaEco = JSON.parse(filaEco);
        let idCentro = req.query.ptoVenta;
        if (idCentro.toString() == "0") {
            idCentro = bol.t_pto_venta_actual;
        }
        const pto = yield t_pto_venta_1.default.findByPk(idCentro);
        const fila = JSON.stringify(pto);
        const ptoVenta = JSON.parse(fila);
        let texto = '';
        if (((_b = req.query.estado_actual) === null || _b === void 0 ? void 0 : _b.toString()) == "EN_ECO") {
            texto = "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.0 Transitional//EN'> " +
                " <html>   <head>            <meta http-equiv='content-type' content='text/html charset=utf-8'/>       <title></title>   <style type='text/css'>     @page { size: 21cm 29.7cm margin: 2cm }" +
                " p { margin-bottom: 0.25cm line-height: 115% background: transparent } a:link { color: #000080 so-language: zxx text-decoration: underline } :visited { color: #800000 so-language: zxx text-decoration: underline } </style> </head> " +
                " <body lang='es-AR' link='#000080' vlink='#800000' dir='ltr'><p style='margin-bottom: 0cm line-height: 100%'> " +
                " <br/></p>  <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell Extra Bold'><font size='6' style='font-size: 28pt'><b>CÓRDOBA " +
                " </b></font></font><font color='#81d41a'><font size='6' style='font-size: 26pt'><i><b>(Servicios Públicos)</b></i></font></font></p>" +
                " <p style='margin-bottom: 0cm line-height: 100%'><br/>        </p> " +
                " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'><i><u><b>Recepción de Bag:</b></u></i></font></p>" +
                " <p style='margin-bottom: 0cm line-height: 100%'><br/> </p> " +
                " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'>Fecha: #sysdate#</font></p> " +
                " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'>Ecoaliado : #Eco# </font></p> " +
                " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'>Cantidad KG : #kg#</font></p> " +
                " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'>Centro verde de recepción : #cv-dir#</font></p> <p style='margin-bottom: 0cm line-height: 100%'><br/> " +
                " </p>  <p style='margin-bottom: 0cm line-height: 100%'><br/>" +
                " </p> <p style='margin-bottom: 0cm line-height: 100%'><br/> " +
                " </p>   </body> </html>";
            let kgv = req.query.kg;
            let date = new Date();
            let fechaStr = "";
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            if (month < 10) {
                fechaStr = `${day}-0${month}-${year}`;
            }
            else {
                fechaStr = `${day}-${month}-${year}`;
            }
            texto = texto.replace("#sysdate#", fechaStr);
            texto = texto.replace("#Eco#", bol.ecoaliado.nombre);
            texto = texto.replace("#kg#", "" + req.query.kg + "");
            texto = texto.replace("#cv-dir#", ptoVenta.nombre + '  calle ' + ptoVenta.calle + ' ' + ptoVenta.numero);
        }
        else
            texto = '';
        res.json({
            resultado: 'OK',
            data: resultado,
            texto: texto,
            ecoaliado: ffilaEco
        });
    })).catch((err) => {
        res.json({
            resultado: 'NOK',
            error: "No se pudo registrar el movimiento"
        });
    });
});
exports.setDatosBug = setDatosBug;
//# sourceMappingURL=tbigbag.js.map