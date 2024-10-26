import ProductsModel from "./models/products.model.js";

class ProductsDao{
    async findById(id){
        return await ProductsModel.findById(id)
    }
    async findOne(code){
        return await ProductsModel.findOne(code)
    }
    async save(productData){
        const product = new ProductsModel(productData)
        return await product.save()
    }
    async update(id, productData){
        return await ProductsModel.findByIdAndUpdate(id, productData)
    }
    async delete(id){
        return await ProductsModel.findByIdAndDelete(id)
    }
    async paginate(filter, options){
        return await ProductsModel.paginate(filter,options)
    }
}

export default new ProductsDao