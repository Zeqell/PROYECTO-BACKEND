import ProductRepository from "../repositories/products.repository.js";

const productRepository = new ProductRepository()

class ProductService{
    async addProduct({title, description, price, thumbnails, code, stock, category}){
        try {
            if(!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios"); 
               return;
          }
          const productExists = await productRepository.getProduct({code: code})
          if(productExists){
              console.log("Error, el codigo debe ser único");
              return
          }
          const newProduct = await productRepository.addProduct({
              title,
              description,
              price,
              code, 
              stock, 
              category,
              status: true,
              thumbnails: thumbnails || []
          })

          await newProduct.save()   
      } catch (error) {
          console.log("Error al agregar el producto", error);
          return null
      } 
    }
    async getProduct({page, limit, sort, category}={}){
        try {
            const filter = {}
            if(category){
                filter.category = { $regex: category, $options: 'i' }

            }
            const options = {page: page, limit: limit, sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined}
            const arrayProducts = await productRepository.paginate(filter,options)
            console.log(arrayProducts);
            return arrayProducts
        } catch (error) {
            console.log("Error al obtener todos los productos",error);
        }
    }
    async getProductById(id){
        try {
            const productId = await productRepository.getProductById(id)

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
    async updateProduct(id, productData){
        try {
            const arrayProducts =  await productRepository.updateProduct(id, productData)
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
            const arrayProducts = await productRepository.deleteProduct(id)
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

export default new ProductService

