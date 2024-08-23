import CartModel from "../models/cart.model.js"

export default class CartsManagerDb {

    async createCart(){
        try {
            const newCart = new CartModel({products: []})
            await newCart.save()
            return newCart
        } catch (error) {
            console.log("Error al crear el carrito");
            return null
        }
    }

    async getCartsById(cid){
        try {
            const cart = await CartModel.findById(cid).populate('products.product')
            if(!cart){
                console.error("No existe un carrito con ese ID")
                return null
            }
            return cart
        } catch (error) {
            console.log("Error al obtener carrito por ID", error);
        }
    }

    async addProductsCart(cartId, productsId, quantity = 1){
        try {
            const cart = await this.getCartsById(cartId)

            const existeProducts = cart.products.find(p => p.product.toString() === productsId)

            if(existeProducts){
            existeProducts.quantity += quantity
        }else{
            cart.products.push({product: productsId, quantity})
        }
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            console.log("Error al agregar producto", error);
        }
    }

    async updateCart(id, updateProduct){
        try {
            const cart = await CartModel.findByIdAndUpdate(id,{products: updateProduct}, {new: true})
            if(!cart){
                console.log("Producto no encontrado");
                return null
            }else{
                console.log("Producto actualizado correctamente");
                return cart
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }

    }

    async updateProductCart(id, productId, quantity){
        try {
            const cart =  await CartModel.findOneAndUpdate(
                { _id: id, "products.product": productId },
                { $set: { "products.$.quantity": quantity } },
                { new: true }
        )
            if(!cart){
                console.log("Producto no encontrado");
                return null
            }else{
                console.log("Producto actualizado correctamente");
                return cart
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }

    }

    async deleteCart(id){
        try {
            const cart = await CartModel.findByIdAndDelete(id)
            if(!cart){
                console.log("Carrito no encontrado");
                return null
            }else{
                console.log("Carrito eliminado correctamente");
                return cart
            }
        } catch (error) {
            console.log("Error al eliminar carrito", error);
        }
    }
}