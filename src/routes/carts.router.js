import { Router } from "express";
import CartsManager from "../managers/cartsManager.js";

const cartManager = new CartsManager("./src/data/carts.json")
const router = Router()

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.json(newCart)
    } catch (error) {
        res.status(500).send("Error del servidor")
    }
})

router.get("/:cid", async (req, res)=>{
    try {
        const cid = parseInt(req.params.cid);
        const cartId = await cartManager.getCartsById(cid)
        res.json(cartId.products)
        // if(!cartId){
        //     return res.send("Carrito no encontrado")
        // }else{
        //     res.send(cartId)
        // }
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

router.post("/:cid/product/:pid", async (req, res)=>{
    let cartId = parseInt(req.params.cid)
    let productId = req.params.pid
    let quantity = req.body.quantity || 1

    try {
        const productUpdate = await cartManager.addProductsCart(cartId, productId, quantity)
        res.json(productUpdate.products)
    } catch (error) {
        res.status(500).send("Error al agregar un producto")
    }
})


export default router