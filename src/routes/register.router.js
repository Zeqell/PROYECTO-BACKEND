import { Router } from "express";
const router = Router()

let users = []

router.get('/', (req, res)=>{
    res.render('register', {})
})

router.post('/user', (req, res)=>{
    const newUser = users
    users.push(newUser)
    res.send({status:"success", mesagge: "Usuario registrado exitosamente"})
})

    

export default router