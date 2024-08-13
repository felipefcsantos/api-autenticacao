import express from 'express'
import { autenticar, cadastrarUsuario, editarUsuario, editarUsuarioPorId, apagarUsuario, buscarUsuarios, buscarUsuarioPorId } from '../controllers/authController.js';
import { verificaToken } from '../middlewares/verificaToken.js';

const routes = express.Router();

routes.post('/auth', autenticar);
routes.get('/usuarios', verificaToken, buscarUsuarios);
routes.get('/usuarios/:id', verificaToken, buscarUsuarioPorId);
routes.post('/usuarios', cadastrarUsuario);
routes.put('/usuarios',verificaToken, editarUsuario);
routes.put('/usuarios/:id',verificaToken, editarUsuarioPorId);
routes.delete('/usuarios/:id',verificaToken, apagarUsuario);

export default routes;