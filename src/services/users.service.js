import usersRepository from "../repositories/users.repository.js";
import { isValidPassword } from "../utils/bcrypt.js";
import cartDao from "../dao/cart.dao.js";

class UserServices{
    async registerUser(userData){
        const {email} = userData
        try {
            const userExisting = await usersRepository.getUserByEmail(email)
            console.log(userExisting)

            if(userExisting){
                console.log("El usuario ya existe");
            }
            const newCart = await cartDao.save({})

            const updatedData = {
                ...userData,
                cart: newCart._id
            }
            return await usersRepository.createUser(updatedData)
        } catch (error) {
            console.log("Error al registrar el usuario", error);
        }
    }
    async loginUser(email, password){
        const user = await usersRepository.getUserByEmail(email)
        if (!user) throw new Error("Usuario no encontrado");

        if (!isValidPassword(password, user.password)) {
            throw new Error("Contraseña incorrecta");
        }
        return user
    }
    async getUserById(id){
        return await usersRepository.getUserById(id)
    }
    async getUser(query){
        return await usersRepository.getUser(query)
    }

    async updateUser(id, userData){
        return await usersRepository.userUpdate(id, userData)
    }

    async deleteUser(id){
        return await usersRepository.userDelete(id)
    }

}

export default new UserServices()