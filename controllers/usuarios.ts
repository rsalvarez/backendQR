import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Usuario from '../models/usuario';
//import { DataTypes } from 'sequelize';
import  { QueryTypes } from 'sequelize';
import TPersona from '../models/t_personas';



export const getUsuarios = async( req: Request , res: Response ) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios });
}

export const getUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if( usuario ) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }


}


export const getLogin = async( req: Request , res: Response ) => {

    const nombre = req.params.nombre;
    const password = req.params.password;
    let comparador = "";
    await Usuario.sequelize?.query("SELECT login_ext( '"+  nombre  + "', '" + password + "') as resultado",
    { type: QueryTypes.SELECT}).then( (pass) => {
            const data = JSON.parse(JSON.stringify(pass[0]));
            comparador = data.resultado;
    });
    //console.log(comparador.toString() );
    if (comparador.toString() != "NON" ) {
        const usuario = await Usuario.findAll({
            where : {
                nombre : nombre,
                estado : 'A'
            }
        })
        res.json( {usuario : usuario,  resultado : 'OK'});
    } else {
        res.json( {usuario : null,  resultado : 'NO'});
    }


}


export const getUsuarioByNombre = async (req: Request, res:Response) => {
    const  nombre = req.params.nombre;
    
    try {
        
        const existeUsr = await Usuario.findOne({
            where: {
                nombre: nombre.toLowerCase()
            }
        });

        if (!existeUsr) {
            return res.status(400).json({
                msg: 'No existe un usuario con el nombre ' + nombre
            });
        }

        res.json( existeUsr );


    } catch (error) {

        res.status(500).json({
            msg: 'Hable con el administrador ' + error
        })    
    }
};




