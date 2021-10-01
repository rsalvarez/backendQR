import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
 
dotenv.config();


const db = new Sequelize(process.env.DB  || 'NONE', process.env.USERDB || 'NONE' , process.env.PASS, {
    host: process.env.SERVERDB,
    port: 3306,
    dialect: 'mysql',
     //logging: false,
});


export default db;
