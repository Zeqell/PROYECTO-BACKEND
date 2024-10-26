import { Router } from "express"
import passport from "passport"
import UserController from "../controllers/users.controller.js"

const userController = new UserController()
const router = Router()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/current", passport.authenticate("current",{session: false}), userController.current)
router.post("/logout", userController.logout)

export default router