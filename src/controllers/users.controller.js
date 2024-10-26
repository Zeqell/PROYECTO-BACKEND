import usersService from "../services/users.service.js";
import UserDTO from "../dto/users.dto.js";
import configObject from "../config/config.js";
import { generateToken } from "../utils/jsonwebtoken.js";
import { creteHash, isValidPassword } from "../utils/bcrypt.js";

const { cookie_token} = configObject

class UserController{
    async register(req, res){
        const {first_name, last_name, email, age, password} = req.body
        try {
            const newUser = await usersService.registerUser({
                first_name,
                last_name,
                email,
                age,
                password: creteHash(password)
            })

            const token = generateToken({
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                role: newUser.role
            })

            res.cookie(cookie_token, token, {maxAge:3600000, httpOnly: true})

            res.redirect("/api/sessions/current")
        } catch (error) {
            res.status(500).send({error: error})
        }
    }
    async login(req, res){
        const {email, password} = req.body

        try {
            const user = await usersService.loginUser(email, password)
            if(!user){
                res.send("El usuario no existe")
            }

            const token = generateToken({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            })

            res.cookie(cookie_token, token, {maxAge:3600000, httpOnly: true})

            res.redirect("/api/sessions/current")
        } catch (error) {
            console.log("Error al iniciar sesion", error);
            res.status(500).send({error: error})
        }
    }
    async current(req, res){
        if(req.user){
            const user = req.user
            const userDto = new UserDTO(user)
            res.render("profile", {user: userDto})
        }else{
            res.send("No autorizado")
        }
    }
    async logout(req, res){
        res.clearCookie(cookie_token) 
        res.redirect("/login")
    }
}

export default UserController