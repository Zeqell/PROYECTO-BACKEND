
import productsDao from "../dao/products.dao.js";

class ProductRepository{
    async addProduct(productData){
        return await productsDao.save(productData)
    }
    async getProductById(id){
        return await productsDao.findById(id)
    }
    async getProduct(code){
        return await productsDao.findOne(code)
    }
    async updateProduct(id, productData){
        return await productsDao.update(id, productData)
    }
    async deleteProduct(id){
        return await productsDao.delete(id)
    }
    async paginate(filter, options){
        return await productsDao.paginate(filter,options)
    }
}

export default ProductRepository