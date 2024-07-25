import { Router } from "express";
import ProductManager from "../managers/productsManager.js"

const manager = new ProductManager("./src/data/products.json")
const router = Router()

router.get("/", async (req, res)=>{
    const limit = req.query.limit
    try {
        const newArray = await manager.getProducts()
        if(limit){
            res.send(newArray.slice(0, limit))
        }else{
            res.send(newArray)
        }        
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

router.get("/:pid", async (req, res)=>{
    let pid = parseInt(req.params.pid);
    try {
        const productId = await manager.getProductById(pid)
        if(!productId){
            res.send("Producto no encontrado")
        }else{
            res.send(productId)
        }
    } catch (error) {
        res.status(500).send("Errro interno del servidor")
    }
})

router.post("/", async (req, res)=>{
    try {
        const newProducts = req.body
        await manager.addProduct(newProducts)
        res.status(201).send("Producto agregado exitosamente")
    } catch (error) {
        res.status(500).json({status: "error", message: error.message})
    }
})

router.put("/:pid", async (req, res) =>{
    try {
        const pid = parseInt(req.params.pid);
        const updatedProduct = req.body;
        const update = await manager.updateProduct(pid, updatedProduct)
        if(!update){
            res.send("Producto Eliminado")
        }else{
            res.send(update)
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

router.delete("/:pid", async (req, res)=>{
    const pid = parseInt(req.params.pid);
    try {
        const deletProduct = await manager.deleteProduct(pid)
        if(!deletProduct){
            res.send("Producto Eliminado")
        }else{
            res.sed(deletProduct)
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

export default router