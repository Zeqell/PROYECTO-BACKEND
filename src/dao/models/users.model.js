import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true,
        unique: true,
        index: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    age: {
        type: Number, 
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    }
})

const UserModel = mongoose.model("users", userSchema)

export default UserModel