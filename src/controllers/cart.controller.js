import  cartServices  from "../services/cart.service.js";
import  productService  from "../services/product.service.js";
import usersService from "../services/users.service.js";
import TicketModel from "../dao/models/ticket.model.js";
import { generateCode, calculateTotal } from "../utils/cartutils.js";

class CartController{
    async cartCreate(req, res){
        try {
            const newCart = await cartServices.createCart()
            res.status(201).send(newCart) 
        } catch (error) {
            res.status(500).send("Error al crear el carrito")
        }
    }
    async getCartId(req, res){
        try {
            const cid = req.params.cid;
            const cartId = await cartServices.getCartsById(cid)
            if (!cartId) {
                res.status(404).send("Carrito no encontrado");
            } else {
                res.send(cartId);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor")
        }
    }
    addProductToCart = async (req, res) => {
        let cartId = req.params.cid
        let productId = req.params.pid
        let quantity = req.body.quantity || 1
    
        try {
            const productUpdate = await cartServices.addProductsCart(cartId, productId, quantity)
            res.json(productUpdate.products)
        } catch (error) {
            res.status(500).send("Error al agregar un producto")
        }
    }
    async updateCart(req, res){
        try {
            const cid = req.params.cid
            const updatedProducts = req.body.products
            const updateCart = await cartServices.updateCart(cid, updatedProducts)
            if(!updateCart){
                res.send("Carrito no encontrado")
            }else{
                res.send(updateCart)
            }
        } catch (error) {
            res.status(500).send("Errro interno del serivor")
        }
    }
    async updateProductToCart(req, res){
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.body.quantity
            console.log("ID del carrito:", cid);
            console.log("ID de producto", pid);
            console.log("Datos actualizados del carrito:", quantity);
            const update = await cartServices.updateProductCart(cid, pid, quantity)
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
    }
    async deleteCart(req, res){
        const cid = req.params.cid;
        try {
            const deleteCart= await cartServices.deleteCart(cid)
            if(!deleteCart){
                return res.status(404).send("Carrito no encontrado")
            }
            res.status(201).send("Carrito eliminado")
            
        } catch (error) {
            console.log("Error al eliminar carrito", error)
    
            res.status(500).send("Error interno del servidor")
        }
    }
    async completePurchase(req, res){
        const cid = req.params.cid
        try {
            const cart = await cartServices.getCartsById(cid)
            if(!cart) return res.status(404).send("Carrito no encotrado")

            const products = cart.products
            const productsNotAvailable = []
            
            for(const item of products){
                const productId = item.product
                const product = await productService.getProductById(productId)
                if(!product){
                    console.error(`Producto con ID ${productId} no encontrado`)
                    productsNotAvailable.push(productId)
                    continue
                }

                if(product.stock >= item.quantity){
                    product.stock -= item.quantity
                    await product.save()
                }else{
                    productsNotAvailable.push(productId)
                }
            }

            const userWithCart = await usersService.getUser({cart: cid})
            if(!userWithCart){
                console.error("Usuario con carrito no encontrado")
                return res.status(404).send("Usuario con carrito no encontrado")
            }
            const totalAmount = calculateTotal(cart.products)
            if (isNaN(totalAmount)) {
                console.error('Error: el total calculado es NaN');
                return res.status(500).send('Error al calcular el total del carrito');
            }
            const ticket = new TicketModel({
                code: generateCode(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: userWithCart._id
            })
            await ticket.save()

            cart.products = cart.products.filter(item => !productsNotAvailable.includes(item.product))
            await cart.save()

            res.send(ticket)
        } catch (error) {
            console.error('Error al procesar la compra',error);
            res.status(500).send('Error interno del servidor')
        }
    }
}

export default CartController
