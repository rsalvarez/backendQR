import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('t_usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    nombre: {
        type: DataTypes.STRING
    },
    passw: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    nombre_real: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
},
 {createdAt: false,
    updatedAt: false}
);


export default Usuario;
