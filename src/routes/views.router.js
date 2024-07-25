import { Router } from "express";

const router = Router()


router.get("/", (req, res)=>{
    res.render("index", {namiStore: "Tu Tienda Online"})
})

router.get("/tienda", (req, res)=>{
    res.render("tienda", {})
})

router.get("/contacto", (req, res)=>{
    res.render("contacto", {})
})



export default router