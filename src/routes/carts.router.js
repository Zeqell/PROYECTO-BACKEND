import { Router } from "express";

import CartController from "../controllers/cart.controller.js";

const router = Router()
const cartController = new CartController()

router.post("/", cartController.cartCreate)
router.get("/:cid", cartController.getCartId)
router.post("/:cid/product/:pid", cartController.addProductToCart)
router.put("/:cid", cartController.updateCart)
router.put("/:cid/product/:pid", cartController.updateProductToCart)
router.delete(":cid", cartController.deleteCart)
router.post("/:cid/purchase", cartController.completePurchase)

export default router