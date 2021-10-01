import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import { Op } from 'sequelize';
import TBigBag from '../models/t_big_bag';
import TMovimientoBag from '../models/t_movimisntos_bags';
import Usuario from '../models/usuario';
import TBag from '../models/t_big_bag';
import TPersona from '../models/t_personas';
import TPtoVenta from '../models/t_pto_venta';


export const getBag = async( req: Request , res: Response ) => {
    const { id } = req.params;
    const retorno = await TBigBag.findByPk( id ,{ include : "ecoaliado" });
  
    res.json({ retorno });
}

export const setEstadoNotifBag = async (req: Request , res: Response ) => {
    const { id } = req.params;
    
    const bag = await TMovimientoBag.update( {
        notificado : 'S'
    },
    {
        where : {
            id : id
        }
    }).then( async ( resultado) => {
        res.json({
            resultado : 'OK'
        })
    }).catch((err) => {
        res.json({
            resultado : 'NOK'
        });
    });
}

export const setStatus = async( req: Request , res: Response ) => {
    let estado_calc = '';
    
    estado_calc =  'EN_ECO' 
    const bag = await TBigBag.update( {
        fecha_cambio_estado : new Date(),
        usuario_cambio_estado : req.query.usuario,
        estado_actual: estado_calc
    },
    {
        where : {
            id : req.query.idBag
        }
    }).then( async ( resultado) => {
        let idBag:string = req.query.idBag as string;
        const bolsa = await TBigBag.findByPk(idBag,{ include : "ecoaliado" });
        const row  =  JSON.stringify( bolsa);
        const bol = JSON.parse(row);

        res.json({
            resultado : 'OK',
            bag : resultado
        })
    }).catch((err) => {
        res.json({
            resultado : 'NOK',
            error : "No se pudo registrar el movimiento => " + JSON.stringify(err)
        });
    });
    

}


export const setDatosBug = async (req: Request, res:Response) => {
    
    const movimeinto = TMovimientoBag.build(
        {
                t_bag_id:req.query.idBag,
                cantidad_kg:req.query.kg,
                t_pto_venta_destino: req.query.ptoVenta,
                usuario_alta:req.query.usuario,
                fecha_alta: new Date(),
                notificado: 'N'
        }

    );
//    console.log(movimeinto);

    let estado_calc = '';
    
    if(req.query.estado_actual?.toString() == "EN_CV") 
        estado_calc =  'EN_ECO' 
    else 
        estado_calc = 'EN_CV';

    movimeinto.save().then( async (resultado) => {
        const bag = await TBigBag.update( {
            fecha_cambio_estado : new Date(),
            usuario_cambio_estado : req.query.usuario,
            estado_actual: estado_calc
        },
        {
            where : {
                id : req.query.idBag
            }
        });

        let idBag:string = req.query.idBag as string;
        const bolsa = await TBigBag.findByPk(idBag,{ include : "ecoaliado" });
        const row  =  JSON.stringify( bolsa);
        const bol = JSON.parse(row);
        //console.log(bol.t_personas_id);
        const ecoaliado = await TPersona.findByPk(bol.t_personas_id, { include : "emails"});
        const filaEco = JSON.stringify(ecoaliado);
        const ffilaEco = JSON.parse(filaEco);
        
        let idCentro:string = req.query.ptoVenta as string;
        if (idCentro.toString() == "0") {
            idCentro = bol.t_pto_venta_actual;
        } 
        const pto = await TPtoVenta.findByPk(idCentro);
        const fila  =  JSON.stringify( pto);
        const ptoVenta = JSON.parse(fila);
        
        let texto = '';
        if(req.query.estado_actual?.toString() == "EN_ECO")  {
            texto = "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.0 Transitional//EN'> " +
            " <html>   <head>            <meta http-equiv='content-type' content='text/html charset=utf-8'/>       <title></title>   <style type='text/css'>     @page { size: 21cm 29.7cm margin: 2cm }" +
            " p { margin-bottom: 0.25cm line-height: 115% background: transparent } a:link { color: #000080 so-language: zxx text-decoration: underline } :visited { color: #800000 so-language: zxx text-decoration: underline } </style> </head> "+ 
            " <body lang='es-AR' link='#000080' vlink='#800000' dir='ltr'><p style='margin-bottom: 0cm line-height: 100%'> " + 
            " <br/></p>  <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell Extra Bold'><font size='6' style='font-size: 28pt'><b>CÓRDOBA " +
             " </b></font></font><font color='#81d41a'><font size='6' style='font-size: 26pt'><i><b>(Servicios Públicos)</b></i></font></font></p>" +
            " <p style='margin-bottom: 0cm line-height: 100%'><br/>        </p> " +
            " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'><i><u><b>Recepción de Bag:</b></u></i></font></p>" +
            " <p style='margin-bottom: 0cm line-height: 100%'><br/> </p> "+
            " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'>Fecha: #sysdate#</font></p> " +
            " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'>Ecoaliado : #Eco# </font></p> " +
            " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'>Cantidad KG : #kg#</font></p> " +
            " <p style='margin-bottom: 0cm line-height: 100%'><font face='Cantarell'>Centro verde de recepción : #cv-dir#</font></p> <p style='margin-bottom: 0cm line-height: 100%'><br/> " +
            " </p>  <p style='margin-bottom: 0cm line-height: 100%'><br/>" +
            " </p> <p style='margin-bottom: 0cm line-height: 100%'><br/> " +
            " </p>   </body> </html>"  ;

            let kgv = req.query.kg;
            let date = new Date();
            let fechaStr = "";

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            if(month < 10){
                fechaStr = `${day}-0${month}-${year}`;
            }else{
                fechaStr = `${day}-${month}-${year}`;
            }

            texto = texto.replace("#sysdate#", fechaStr);
            texto = texto.replace("#Eco#", bol.ecoaliado.nombre + " / " + bol.ecoaliado.apellido );
            texto = texto.replace("#kg#", "" + req.query.kg + "" );
            texto = texto.replace("#cv-dir#", ptoVenta.nombre + '  calle ' + ptoVenta.calle  + ' ' + ptoVenta.numero );
            
        }
        else 
            texto = '';

            
        
        res.json({
            resultado : 'OK',
            data : resultado,
            texto : texto,
            ecoaliado: ffilaEco
        })
    }
    ).catch((err) => {
        res.json({
            resultado : 'NOK',
            error : "No se pudo registrar el movimiento"
        });
    });

    
    
};



