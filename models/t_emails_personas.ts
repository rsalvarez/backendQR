import { DataTypes } from 'sequelize';
import db from '../db/connection';

const TEmailsPersona = db.define('t_emails_personas', {
    // If TBag't want createdAt
    id: {
    type:DataTypes.INTEGER,
    primaryKey:true
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
    
}, {createdAt: false,
    updatedAt: false
});


export default TEmailsPersona;