import { Router } from "express";
import CartsManagerDb from "../dao/db/cartDb.js";

const cartManager = new CartsManagerDb()
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
        const cid = req.params.cid;
        const cartId = await cartManager.getCartsById(cid)
        if (!cartId) {
            res.status(404).send("Carrito no encontrado");
        } else {
            res.send(cartId);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

router.post("/:cid/product/:pid", async (req, res)=>{
    let cartId = req.params.cid
    let productId = req.params.pid
    let quantity = req.body.quantity || 1

    try {
        const productUpdate = await cartManager.addProductsCart(cartId, productId, quantity)
        res.json(productUpdate.products)
    } catch (error) {
        res.status(500).send("Error al agregar un producto")
    }
})

router.put("/:cid", async(req, res)=>{
    try {
        const cid = req.params.cid
        const updatedProducts = req.body.products
        const updateCart = await cartManager.updateCart(cid, updatedProducts)
        if(!updateCart){
            res.send("Carrito no encontrado")
        }else{
            res.send(updateCart)
        }
    } catch (error) {
        res.status(500).send("Errro interno del serivor")
    }
})

router.put("/:cid/product/:pid", async (req, res) =>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity
        console.log("ID del carrito:", cid);
        console.log("ID de producto", pid);
        console.log("Datos actualizados del carrito:", quantity);
        const update = await cartManager.updateProductCart(cid, pid, quantity)
        console.log("Carrito actualizado", update);
        if(!update){
            res.send("Carrito no encontrado")
        }else{
            res.send(update)
        }
    } catch (error) {
        console.log("Error al actualizar el carrito", error)

        res.status(500).send("Error interno del servidor")
    }
})

router.delete("/:cid", async (req, res)=>{
    const cid = req.params.cid;
    try {
        const deleteCart= await cartManager.deleteCart(cid)
        if(!deleteCart){
            return res.status(404).send("Carrito no encontrado")
        }
        res.status(201).send("Carrito eliminado")
        
    } catch (error) {
        console.log("Error al eliminar carrito", error)

        res.status(500).send("Error interno del servidor")
    }
})

export default router