import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import ptoVentaRoutes from '../routes/tptoventa';
import bagRoutes from '../routes/tbigbag';

import cors from 'cors';

import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        puntosventa : '/api/ptoventa',
        bigbag : '/api/bigbag'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '9000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            throw new Error( error );
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use( this.apiPaths.usuarios, userRoutes  ),
        this.app.use( this.apiPaths.puntosventa, ptoVentaRoutes )
        this.app.use( this.apiPaths.bigbag, bagRoutes )
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;

