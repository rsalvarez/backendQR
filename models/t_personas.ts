import { DataTypes } from 'sequelize';
import db from '../db/connection';
import TEmailsPersona from './t_emails_personas'
//import TBag from './t_big_bag';

const TPersona = db.define('t_personas', {
    // If don't want createdAt
    id: {
    type:DataTypes.INTEGER,
    primaryKey:true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    }
    
}, {createdAt: false,
    updatedAt: false
});

const newLocal = 'emails';
TPersona.hasMany(TEmailsPersona , {
    foreignKey :{ name :  't_persona_id' },
    as : newLocal
});


export default TPersona;