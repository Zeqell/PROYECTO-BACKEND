import usersDao from "../dao/users.dao.js";

class UserRepository{
    async createUser(userData){
        return await usersDao.save(userData)
    }
    async getUserByEmail(email){
        return await usersDao.findOne({email})
    }
    async getUser(query){
        return await usersDao.findOne(query)
    }
    async getUserById(id){
        return await usersDao.findById(id)
    }
    async userUpdate(id, userData){
        return await usersDao.update(id, userData)
    }
    async userDelete(id){
        return await usersDao.delete(id)
    }
}

export default new UserRepository