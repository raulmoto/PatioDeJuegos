import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
const app = express();
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/public', express.static(__dirname + '/public'));

// Middleware de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://playground.babylonjs.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// Define el endpoint para retornar el modelo GLB
app.get('/assets/*', (req, res) => {
    try {
        const subPath = req.params[0];
        console.log(subPath);
        const fullPath = path.join(process.cwd(),'','assets',subPath);
        res.sendFile(fullPath);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error:'Error interno del servidor',messageError:error
        });
    }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
