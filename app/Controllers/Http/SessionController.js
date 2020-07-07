'use strict'

class SessionController {


        async create({ request, auth }){

            /*  Outra maneira de fazer
            const email = request.only(['email'])
            const password = resquest.only(['password'])
            */
            const { email, password } = request.all() // ES6
            const token = await auth.attempt(email, password)
            return token;


        }



}

module.exports = SessionController
