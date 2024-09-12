// import { Router } from "express";
// import UserModel from "../dao/models/users.model.js";
// const router = Router()

// router.get("/", async (req, res)=>{
//     try {
//         const userList = await UserModel.find()
//         res.send(userList)        
//     } catch (error) {
//         res.status(500).send("Server error")
//     }
// })

// router.post("/", async (req, res)=>{
//     const newUser = req.body
//     try {
//         const item = new UserModel(newUser)
//         await item.save()
//         res.status(201).send("Create user")
//     } catch (error) {
//         res.status(500).send("Error creating user ")
//     }
// })

// router.put("/:id", async (req, res)=>{
//     let userId = req.params.id
//     let date = req.body
//     try {
//         const userUpdate = await UserModel.findByIdAndUpdate(userId, date)
//         if(!userUpdate){
//             return res.status(404).send("Usuario no encontrado")
//         }
//         res.status(201).send("update user")
//     } catch (error) {
//         res.status(500).send("server error")
//     }
// })

// router.delete("/:id", async (req, res)=>{
//     let userId = req.params.id
//     try {
//         const userDelete = await UserModel.findByIdAndDelete(userId)
//         if(!userDelete){
//             return res.status(404).send("Usuario no encontrado")
//         }
//         res.status(201).send("delete user")
//     } catch (error) {
//         res.status(500).send("server error")
//     }

// })

// export default router