import { Router } from "express";
import UserModel from "../dao/models/users.model.js";
import {creteHash, isValidPassword} from "../utils/bcrypt.js"

const router = Router()

router.post("/register", async (req, res)=>{
    let {first_name, last_name, email, password, age} = req.body
    
    if (!first_name || !last_name || !email || !password || !age) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    try {
        const userExists = await UserModel.findOne({email: email})
        if(userExists){
            return res.status(400).send("El email ya se encuentra registrado")
        }

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password: creteHash(password),
            age
        })

        req.session.user = {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
        }

        req.session.login = true

        res.status(201).send("Usuario creado exitosamente")

    } catch (error) {
        console.error("Error durante el registro",error);
        res.status(500).send("Error interno del servidor",error)
    }
})

router.post("/login", async (req, res)=>{
    let {email, password} = req.body
    try {
        const searchUser = await UserModel.findOne({email: email})
        if(searchUser){
            if(isValidPassword(password, searchUser)){
                req.session.user = {
                    first_name: searchUser.first_name,
                    last_name: searchUser.last_name,
                    email: searchUser.email
                }
                
                req.session.login = true
                res.redirect("/profile")
            }else{
                res.status(401).send("Contraseña incorrecta")
            }
        }else{
            res.status(404).send("Usuario no encontrado")
        }
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error)
        res.status(500).send("Error interno del servidor")
    }
})

router.get("/logout", (req, res)=>{
    if(req.session.login){
        req.session.detroy()
    }
    res.redirect("/login")
})


export default router