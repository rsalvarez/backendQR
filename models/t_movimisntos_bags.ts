import { DataTypes } from 'sequelize';
import db from '../db/connection';
//id, t_bag_id, cantidad_kg, t_pto_venta_destino, usuario_alta, fecha_alta, notificado

const TMovimientoBag = db.define('t_movimientos_bolsas', {
    // If TBag't want createdAt
    id: {
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
    },
    t_bag_id: {
        type: DataTypes.NUMBER
    },
    cantidad_kg: {
        type: DataTypes.DECIMAL
    },
    t_pto_venta_destino: {
        type: DataTypes.NUMBER
    },
    usuario_alta: {
        type: DataTypes.STRING
    },
    fecha_alta: {
        type: DataTypes.DATE
    },
    notificado: {
        type: DataTypes.CHAR
    }

    
}, {createdAt: false,
    updatedAt: false
});
//const newLocal = 'ecoaliado';
//TBag.belongsTo(TPersona , {
//    foreignKey :{ name :  't_personas_id' },
//    as : newLocal
//});
//TPersona.findByPk(TBag.t_personas_id);

export default TMovimientoBag;