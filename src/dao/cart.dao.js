import CartModel from "./models/cart.model.js";

class CartDao{
    async findById(cid){
        return await CartModel.findById(cid).populate('products.product')
    }
    async findOne(query){
        return await CartModel.findOne(query)
    }
    async save(cartData){
        const cart = new CartModel(cartData)
        return await cart.save()
    }
    async update(cid, cartData){
        return await CartModel.findByIdAndUpdate(cid, cartData)
    }
    async updateOne(cid,pid, quantity){
        return await CartModel.findOneAndUpdate(cid,pid, quantity)
    }
    async delete(cid){
        return await CartModel.findByIdAndDelete(cid)
    }
}

export default new CartDao