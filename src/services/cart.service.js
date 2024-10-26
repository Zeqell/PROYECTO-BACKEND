import CartRepository from "../repositories/cart.repository.js";

const cartRepository = new CartRepository()

class CartService{
    async createCart(){
        try {
            const newCart = await cartRepository.addCart({products: []})
            await newCart.save()
            return newCart
        } catch (error) {
            console.log("Error al crear el carrito");
            return null
        }
    }
    async getCartsById(cid){
        try {
            const cart = await cartRepository.getCartById(cid)
            if(!cart){
                console.error("No existe un carrito con ese ID")
                return null
            }
            return cart
        } catch (error) {
            console.log("Error al obtener carrito por ID", error);
        }
    }
    async addProductsCart(cid, pid, quantity = 1){
        try {
            const cart = await this.getCartsById(cid)

            const existeProducts = cart.products.find(p => p.product.toString() === pid)

            if(existeProducts){
            existeProducts.quantity += quantity
        }else{
            cart.products.push({product: pid, quantity})
        }
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            console.log("Error al agregar producto", error);
        }
    }
    async updateCart(cid, updateProduct){
        try {
            const cart = await cartRepository.updateCart(cid,{ products: updateProduct }, { new: true })
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
            const cart =  await cartRepository.updateProductCart(
                { _id: id, "products.product": productId },
                { $set: { "products.$.quantity": quantity } },
                { new: true }
        )
            if(!cart){
                console.log("Producto no encontrado");
                return null
            }else{
                return cart
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }

    }
    async deleteCart(cid){
        try {
            const cart = await cartRepository.deleteCart(cid)
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

export default new CartService