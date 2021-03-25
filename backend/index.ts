import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';


const server = Server.instance;

// body-parser antes de la configuración de rutas
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// cors antes de las rutas
server.app.use(cors({
    origin: '*', // acceso a todos
    credentials: true
}));

server.app.use('/', router);

server.start(() => {
    console.log(`%c ¡Servidor corriendo en el puerto ${ server.port }!`, 'color: #00ff00');
});
