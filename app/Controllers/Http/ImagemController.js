'use strict'

const Imovel = require('../../Models/Imovel')
const Helpers = use('Helpers')
const imovel = use ('App/Models/Imovel')


class ImagemController {
  

  async show ({ params, response }) { 
    return response.download(Helpers.tpmPath(`upload/${params.path}`)) 
}

async store ({ auth, request, response, params }) {
    const imovel = Imovel.findOrFail(params.id)
                                
    const imagens = request.file('image', {
      types: ['image'],      
      size: '5mb'
    })
    await imagens.moveAll(Helpers.tpmPath('uploads'), file =>({ 
      name: `${Date.now()}-${file.clientName}` 
    })) 

    if(!imagens.movedAll()){
      return imagens.errors()
    }
}


}

module.exports = ImagemController
