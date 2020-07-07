'use strict'

const Imovel = require('../../Models/Imovel')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const imovel = use ('App/Models/Imovel')

class ImovelController {

  async index ({ request }) {

    const { latitude, longitude } = request.all()
                                      // proximidade => scopeProximidade filtro la do imovel.js (palvra scope faz com que identifique como filto)
    const imoveis = await Imovel.query().proximidade( latitude, longitude, 5000 ).fetch() // fetch() => organiza em array

    return imoveis;
  }

  async store ({ auth, request, response }) {

    const data = request.only([
          'descricao',
          'endereco',
          'valor', 
          'latitude',
          'longitude'
    ])

    data.user_id = auth.user.id // verificação de usuário

    const imovel = await Imovel.create(data)
    return imovel;
  }

  async show ({ params }) { /// começar criar a imagem, 37:09 min
    const imovel = await Imovel.findOrFail(params.id) 
    return imovel;
  }

  async update ({ params, request, response }) {
    const imovel = await Imovel.findOrFail(params.id)

    const data = request.only([
      'descricao',
      'endereco',
      'valor', 
      'latitude',
      'longitude'
    ])

    imovel.merge(data) // neste momento o imovel tem os novos dados
    await imovel.save() // salva as alteração no imovel
    return imovel;

  }

  async destroy ({ auth, params, response }) {
    const imovel = await Imovel.findOrFail(params.id)

    if (imovel.user_id !== auth.user.id) { // verificação pra excluir somente imóveis do próprio usuário
        return response.status(401).send({ error: 'Você não possui autorização!' })
    }
    await imovel.delete()
  }
}

module.exports = ImovelController
