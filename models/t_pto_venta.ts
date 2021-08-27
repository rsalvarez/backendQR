import { DataTypes } from 'sequelize';
import db from '../db/connection';

const TPtoVenta = db.define('t_pto_venta', {
    // If don't want createdAt
    id: {
    type:DataTypes.INTEGER,
    primaryKey:true
    },
    nombre: {
        type: DataTypes.STRING
    },
    calle: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    ip: {
        type: DataTypes.STRING
    },
    nombre_db: {
        type: DataTypes.STRING
    },
    puerto: {
        type: DataTypes.STRING
    }
    
}, {createdAt: false,
    updatedAt: false
});


export default TPtoVenta;