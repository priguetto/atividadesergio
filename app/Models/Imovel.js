'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Imovel extends Model {

            // FILTRO
    static scopeProximidade(query, latitude, longitude, distancia){ // 6371 faz o calculo da distancia em km
            const haversine = `(6371 * acos(cos(radians(${latitude})) 
                                * cos(radians(latitude))
                                * cos(radians(longitude)
                                - radians(${longitude}))
                                + sin(radians(${latitude}))
                                * sin(radians(latitude))))`// Código naval para realizar o calculo de geolocalização.

            return query
                        .select('*', Database.raw(`${haversine} as distancia`)) // novo campo "distancia"
                        .whereRaw(`${haversine} < ${distancia}`) // onde a localização < distancia
    }
  
    user(){
            return this.belongsTo('App/Models/User') // relacionamento, diz que o imóvel pertence a um usuario

    }
    fotos(){
        return this.hasMany('App/Models/Imagem') // relacionamento, diz que o imovel tem varias fotos(hasMany)
    
    }

}


module.exports = Imovel
