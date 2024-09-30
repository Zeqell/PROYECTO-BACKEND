import { Router } from "express";
import UserModel from "../dao/models/users.model.js";
import {creteHash, isValidPassword} from "../utils/bcrypt.js"
import passport from "passport";
import {generateToken, githubAuth} from "../utils/jsonwebtoken.js";
import CartModel from "../dao/models/cart.model.js";

const router = Router()

router.post("/register", async (req, res)=>{
    const {first_name, last_name, email, password, age} = req.body
    try {
        const userExists = await UserModel.findOne({email})
        if(userExists){
            return res.send("El email ya se encuentra registrado")
        }

        const newCart = new CartModel()
        await newCart.save()

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            cart: newCart._id,
            password: creteHash(password),
            age
        })

        const token = generateToken({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email
        })
        res.cookie("CookieToken", token, {
            maxAge: 3600000,
            httpOnly:true
        })
        res.redirect("/api/sessions/current")
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

router.post("/login", async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            res.send("No existe el usuario")
        }
        if(!isValidPassword(password, user)){
            return res.send("Credenciales invalidas")
        }
        const token = generateToken({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        })
        res.cookie("CookieToken", token, {
            maxAge: 3600000,
            httpOnly:true
        })
        res.redirect("/api/sessions/current")
        //res.send({message: "Logueado exitosamente", token})
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

router.get("/logout", (req, res)=>{
    res.clearCookie("CookieToken")
    res.redirect("/login")
})

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}) , (req, res)=>{})

router.get("/githubcallback", passport.authenticate("github",{ failureRedirect: '/login' }), async (req, res) => {
    res.redirect("/profile")
})

router.get("/current", passport.authenticate("current", {session:false}), (req, res)=>{
    res.render("profile", {user: req.user})
})

export default router