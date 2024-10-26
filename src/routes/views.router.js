import {Router} from "express";
import  productService  from "../services/product.service.js";
import  cartServices  from "../services/cart.service.js";
import { adminOnly, usersOnly } from "../utils/authorization.js";
import passport from "passport";

const router = Router()

router.get("/products", passport.authenticate("current", {session:false}), usersOnly, async (req, res)=>{
    try {
        let limit = req.query.limit || 5
        let page = req.query.page || 1
        let sort = req.query.sort || ''
        
        const products = await productService.getProduct({page, limit,sort})

        const result = products.docs.map(product=>{
            const {_id, ...rest} = product.toObject()
            return rest
        })
        res.render("home", {
            products: result,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages
        })
    } catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).send("Error al obtener los productos")
    }
})

router.get("/carts/:cid", async (req, res)=>{
    try {
        const cid = req.params.cid
        const cart = await cartServices.getCartsById(cid)
        if (!cart) {
            res.status(404).send("Carrito no encontrado");
        } else {
            res.render("cart", { cart })
        }
    } catch (error) {
        console.log("Error al obtener el carrito", error);
        res.status(500).send("Error interno del servidor");
    }
})

router.get("/realtimeproducts", passport.authenticate("current", {session:false}), adminOnly, async (req, res)=>{
    res.render("realTimeProducts")
})


router.get("/register", (req, res)=>{
    res.render("register")
})

router.get("/login", (req, res)=>{
    res.render("login")
})

router.get("/profile", (req, res)=>{
    res.render("profile")
})

router.get("/resetpassword", (req, res)=>{
    res.render("resetpassword")
})

export default router
