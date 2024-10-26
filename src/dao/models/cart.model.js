import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            require: true
        },
        quantity: {
            type: Number,
            require: true
        }
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
})  

const CartModel = mongoose.model("carts", cartSchema)

export default CartModel