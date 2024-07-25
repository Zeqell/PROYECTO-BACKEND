import { Router } from "express";
const router = Router()

const users = []

router.get("/", (req, res)=>{
    res.send(users)
})

router.get("/api/users/:pid", (req, res)=>{
    let id = req.params.id;
    let usuarioBuscado = users.find(producto => producto.id == id);
    if(!usuarioBuscado){
        res.send("Usuario no encontrado")
    }else{
        res.send(usuarioBuscado)
    }
})

router.post("/", ()=>{
    const newUser = req.body

    users.push(newUser)
    res.send({status:"success", mesagge: "Usuario Creado"})
})

export default router