import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
 
dotenv.config();

const db = new Sequelize(process.env.DB||'replicador' , 'replicador', 'replicador1', {
    host: process.env.SERVERDB,
    port: 3306,
    dialect: 'mysql',
     //logging: false,
});


export default db;
