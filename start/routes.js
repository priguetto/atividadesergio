'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('/imoveis', 'ImovelController').apiOnly().middleware('auth') 
/* 
Remove GET resource/create e GET resource/:id/edit
.middleware() para proteger as rotas, e o 'auth' para autenticar 
Necessitando passar pelo token (login) para ser autenticado
*/


Route.post('/usuarios', 'UserController.create').middleware()

Route.post('/token', 'SessionController.create').middleware()