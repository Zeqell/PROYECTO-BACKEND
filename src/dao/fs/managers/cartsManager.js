import fs from "fs/promises"

export default class CartsManager {
    constructor(path){
        this.path = path
        this.carts = []
        this.ultId = 0

        this.loadCart()
    }

    async loadCart(){
        try {
            const data = await fs.readFile(this.path, "utf-8")
            this.carts = JSON.parse(data)

            if(this.carts.length > 0){
                this.ultId = Math.max(...this.carts.map(cart => cart.id))
            }
        } catch (error) {
            console.log("Error al cargar los carts", error);
            await this.saveCart()
        }
    }

    async saveCart(){
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    }

    async createCart(){
        const newCart = {
            id: ++this.ultId,
            products: []
        }

        this.carts.push(newCart)

        await this.saveCart()
        return newCart
    }

    async getCartsById(cid){
        try {
            const cart = this.carts.find(cart => cart.id ===  cid)

            if(!cart){
                console.error("No existe un carrito con ese ID")
            }
            return cart
        } catch (error) {
            console.log("Error al obtener carrito por ID", error);

        }
    }

    async addProductsCart(cartId, productsId, quantity = 1){
        const cart = await this.getCartsById(cartId)

        const existeProducts = cart.products.find(p => p.product === productsId)

        if(existeProducts){
            existeProducts.quantity+= quantity
        }else{
            cart.products.push({product: productsId, quantity})
        }

        await this.saveCart()
        return cart
    }
}