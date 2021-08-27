import { DataTypes } from 'sequelize';
import db from '../db/connection';
import TPersona from './t_personas';

const TBag = db.define('t_bolsas', {
    // If TBag't want createdAt
    id: {
    type:DataTypes.INTEGER,
    primaryKey:true
    },
    img_qr: {
        type: DataTypes.STRING
    },
    estado_actual: {
        type: DataTypes.STRING
    },
    usuario_cambio_estado: {
        type: DataTypes.STRING
    },
    t_pto_venta_actual: {
        type: DataTypes.INTEGER
    },
    t_personas_id: {
        type: DataTypes.INTEGER
    },
    fecha_cambio_estado: {
        type: DataTypes.DATE
    },
    usuario_alta : {
        type: DataTypes.STRING
    }

    
}, {createdAt: false,
    updatedAt: false
});
const newLocal = 'ecoaliado';
TBag.belongsTo(TPersona , {
    foreignKey :{ name :  't_personas_id' },
    as : newLocal
});
//TPersona.findByPk(TBag.t_personas_id);

export default TBag;