import ProductsModel from "../models/products.model.js";

export default class ProductManagerDb {

    async addProduct({title, description, price, thumbnails, code, stock, category}) {
        try {
              if(!title || !description || !price || !code || !stock || !category) {
                  console.log("Todos los campos son obligatorios"); 
                 return;
            }
            //Validamos que el codigo sea unico. 
            const productExists = await ProductsModel.findOne({code: code})
            if(productExists){
                console.log("Error, el codigo debe ser único");
                return
            }
            //Creamos el nuevo producto: 
            const newProduct = new ProductsModel({
                title,
                description,
                price,
                code, 
                stock, 
                category,
                status: true,
                thumbnails: thumbnails || []
            })
            //Lo guardamos
            await newProduct.save()   
        } catch (error) {
            console.log("Error al agregar el producto", error);
            return null
        } 
    }

    async getProducts({page,  limit, sort}={}) {
        try {
            const options = {page: page, limit: limit, sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined}
            const arrayProducts = await ProductsModel.paginate({},options)
            console.log(arrayProducts);
            return arrayProducts
        } catch (error) {
            console.log("Error al obtener todos los productos",error);
        }
    }

    async getProductById(id) {
        try {
            const productId = await ProductsModel.findById(id)

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

    async updateProduct(id, updatedProduct){
        try {
            const arrayProducts =  await ProductsModel.findByIdAndUpdate(id, updatedProduct)
            if(!arrayProducts){
                console.log("Producto no encontrado");
                return null
            }else{
                console.log("Producto actualizado correctamente");
                return arrayProducts
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }

    }

    async deleteProduct(id){
        try {
            const arrayProducts = await ProductsModel.findByIdAndDelete(id)
            if(!arrayProducts){
                console.log("Producto no encontrado");
                return null
            }else{
                console.log("Producto eliminado correctamente");
                return arrayProducts
            }
        } catch (error) {
            console.log("Error al eliminar producto", error);
        }
    }
}
