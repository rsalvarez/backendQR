import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import { Op } from 'sequelize';
import PtoVenta from '../models/t_pto_venta';


export const getAllPtoVenta = async( req: Request , res: Response ) => {
    
    const retorno = await PtoVenta.findAll({ where: {  id: {[Op.notIn] : [1,2]} } });
   
    res.json({ retorno });
}

export const getPtoventa = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const retorno = await PtoVenta.findByPk( id );

    if( retorno ) {
        res.json(retorno);
    } else {
        res.status(404).json({
            msg: `No existe un Centro verde con el id ${ id }`
        });
    }


}



