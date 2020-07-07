'use strict' // deixa a linguagem um pouco mais tipada.

const User = use("App/Models/User")// importando o model user
 
class UserController {

    async create({ request }){
        
        const formData = request.only(["username", "email", "password"]) // requisição apenas dos dados necessários
        const user = await User.create(formData) // vai criar o objeto user 
                 
        return user;
    }
}



/* OBS

await faz o cogio para e esperar até que a requisição seja processada


async function func(){
    return 1;
}
alert(func()) -- não acontece nada
func().then(alert) -- resultado de 1
*/

module.exports = UserController
