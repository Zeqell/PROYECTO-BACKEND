import cartDao from "../dao/cart.dao.js";

class CartRepository{
    async addCart(cartData){
        return await cartDao.save(cartData)
    }
    async getCartById(cid){
        return await cartDao.findById(cid)
    }
    async  updateCart(cid, cartData){
        return await cartDao.update(cid, cartData)
    }
    async updateProductCart(cid, pid, quantity){
        return await cartDao.updateOne(cid,pid, quantity)
    }
    async deleteCart(cid){
        return await cartDao.delete(cid)
    }
}

export default CartRepository