import jwt from "jsonwebtoken"
import UserModel from "../dao/models/users.model.js"

const private_key = "secretToken"

const generateToken = (user) =>{
    const token = jwt.sign({email:user.email, first_name: user.first_name, last_name: user.last_name,}, private_key, {expiresIn: "24h"})
    return token
}
// Función para registrar o iniciar sesión con GitHub
const githubAuth = async (profile) => {
    try {
        let user = await UserModel.findOne({ email: profile._json.email })
        if (!user) {
            let newUser = {
                first_name: profile._json.name,
                last_name: profile._json.name,
                email: profile._json.email,
                password: "123",
            }
            user = await UserModel.create(newUser)
        }
        const token = generateToken(user);
        return { user, token }
    } catch (error) {
        console.log(error);
    }
}

export {generateToken, githubAuth}