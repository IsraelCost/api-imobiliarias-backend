const express = require('express');
const routes = express.Router();
const ImagesController = require('./controllers/ImageController');
const ImobiliariasController = require('./controllers/ImobiliariaController');
const ImoveisController = require('./controllers/ImovelController');
const AdministradoresController = require('./controllers/AdministratorController');
const CondominioController = require('./controllers/CondominioController');
const Imagens_ImovelController = require('./controllers/Imagens_ImovelController');

const authMiddleware = require('./middlewares/auth');

// Administradores
routes.get('/administradores', AdministradoresController.index);
routes.post('/administradores', AdministradoresController.create);
routes.post('/administradores/authenticate', AdministradoresController.auth);
routes.put('/administradores/:id', AdministradoresController.update);
routes.delete('/administradores/:id', AdministradoresController.delete);

routes.use(authMiddleware);

// Condomínios
routes.get('/condominios', CondominioController.index);
routes.post('/condominios', CondominioController.create);
routes.put('/condominios/:chave', CondominioController.update);
routes.delete('/condominios/:chave', CondominioController.delete);

// Imagens da galeria do condomínio
routes.get('/condominios/:chave_condominio/imagens', ImagesController.index);
routes.post('/condominios/:chave_condominio/imagens', ImagesController.create);
routes.put('/condominios/:chave_condominio/imagens/:id', ImagesController.update);
routes.delete('/condominios/:chave_condominio/imagens/:id', ImagesController.delete);

// Imobiliárias
routes.get('/condominios/:chave_condominio/imobiliarias', ImobiliariasController.index);
routes.post('/condominios/:chave_condominio/imobiliarias', ImobiliariasController.create);
routes.put('/condominios/:chave_condominio/imobiliarias/:chave_imobiliaria', ImobiliariasController.update);
routes.delete('/condominios/:chave_condominio/imobiliarias/:chave_imobiliaria', ImobiliariasController.delete);

// Imóveis
routes.get('/condominios/:chave_condominio/imoveis', ImoveisController.index);
routes.post('/condominios/:chave_condominio/imoveis', ImoveisController.create);
routes.put('/condominios/:chave_condominio/imoveis/:id', ImoveisController.update);
routes.delete('/condominios/:chave_condominio/imoveis/:id', ImoveisController.delete);

// Imagens dos imóveis
routes.get('/condominios/:chave_condominio/imoveis/:id_imovel/imagens', Imagens_ImovelController.index);
routes.post('/condominios/:chave_condominio/imoveis/:id_imovel/imagens', Imagens_ImovelController.create);
routes.put('/condominios/:chave_condominio/imoveis/:id_imovel/imagens/:id', Imagens_ImovelController.update);
routes.delete('/condominios/:chave_condominio/imoveis/:id_imovel/imagens/:id', Imagens_ImovelController.delete);

module.exports = routes;