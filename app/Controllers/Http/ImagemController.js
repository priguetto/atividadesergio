'use strict'

const Imovel = require('../../Models/Imovel')
const Helpers = use('Helpers')


const imovel = use ('App/Models/Imovel')

class ImagemController {

  async show ({ params, response }) { 
        return response.download(Helpers.tpmPath(`upload/${params.path}`)) 
    /* 
    line 11: começar criar a imagem
    line 12: faz o download pelo da URL da imagem - path pode ser qualquer nome
    line 12: 'Helpers'- uma palavra reservada do Adonis que facilita tarefas dentro do código
    line 12: helpers.tmpPath() - vai encapsular o caminho temporariamente e depois exclui
    */

  }

  async store ({ auth, request, response, params }) {
        const imovel = Imovel.findOrFail(params.id)
                                    
        const imagens = request.file('image', {
          types: ['image'],      
         size: '8mb'
          /* 
          line 25 col 39: Este campo é o tipo do arquivo
          Comentarios: 
            adonis é bullshit KKKKKKKKKKKKKKK ao inves de ter o trabalho de colocar os tipos (png, jpeg e etc), 
            apenas com o 'image' ja traz todos os tipos  
          */
        })

        await imagens.moveAll(Helpers.tpmPath('uploads'), file =>({ 
          name: `${Date.now()}-${file.clientName}` 
          /*
          line 32: moveAll() - percorre os arquivos para salva-los com um padrão
          line 33: Parametros que cada arquivo vai receber 
          line 33 col 39: file.clientName - pega o nome do usuário que tirou a foto
          */
        })) 

        if(!imagens.movedAll()){
          return imagens.errors()
        }
          /*
          Obs: 
          line 25: todas essas funções (movedAll(),errors(),moveAll()) só são possiveis por causa do tipo .file('image'){--}
          */
  }
}

module.exports = ImovelController
