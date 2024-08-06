import {Router} from "express";
import ProductManager from "../managers/productsManager.js";

const manager = new ProductManager("./src/data/products.json")
const router = Router()

router.get("/products", async (req, res)=>{
    const products = await manager.getProducts()

    res.render("home", {products})
})

router.get("/realtimeproducts", async (req, res)=>{
    res.render("realTimeProducts")
})

export default router
