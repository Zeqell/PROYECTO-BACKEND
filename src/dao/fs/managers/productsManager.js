import fs from "fs/promises"

export default class ProductManager {
    static ultId = 0; 

    constructor(path) {
        this.products = []; 
        this.path = path;
    }

    async addProduct({title, description, price, img, code, stock}) {

        //Realizamos las validaciones y si las pasa creamos el objeto con el id autoincrementable

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios"); 
            return; 
        }

        const arrayProducts = await this.rFile();

        //Validamos que el codigo sea unico. 

        if(arrayProducts.some( item => item.code === code)) {
            console.log("El codigo debe ser unico"); 
            return; 
        }

        //Creamos el nuevo objeto: 
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code, 
            stock
        }

        //Lo agrego al array: 
        arrayProducts.push(newProduct);
        //Lo agregamos a un archivo
        await this.saveFile(arrayProducts)
    }

    async getProducts() {
        try {
            const arrayProducts = await this.rFile()
            return arrayProducts
        } catch (error) {
            console.log("Error al leer el archivo",error);
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.rFile()
            const productId = arrayProducts.find(item => item.id === id)

            if(!productId){
                console.log("Producto no encontrado");
                return null
            }else{
                console.log("Producto encontrado");
                return productId
            }
        } catch (error) {
            console.log("Error al buscar producto por ID", error);
        }      
    }

    async rFile(){
        try {
            const answer = await fs.readFile(this.path, "utf-8")
            const arrayProducts = JSON.parse(answer)
            return arrayProducts
        } catch (error) {
            console.log("Error al leer el archivo", error);
        }
    }

    async saveFile(arrayProducts){
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    async updateProduct(id, updatedProduct){
        try {
            const arrayProducts =  await this.rFile()
            const index = arrayProducts.findIndex(item => item.id === id)
            if(index !== -1){
                arrayProducts[index] = {...arrayProducts[index], ...updatedProduct}
                await this.saveFile(arrayProducts)
                console.log("Producto actualizado correctamente");
            }else{
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }

    }

    async deleteProduct(id){
        try {
            const arrayProducts = await this.rFile()
            const index = arrayProducts.findIndex(item => item.id === id)
            if(index !== -1){
                arrayProducts.splice(index, 1)
                await this.saveFile(arrayProducts)
                console.log("Producto eliminado correctamente");
            }else{
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.log("Error al eliminar producto", error);
        }
    }
}
