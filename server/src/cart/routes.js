const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getCart)
router.post("/", controller.addCart);
router.patch("/", controller.addCartItems)
router.get("/:id", controller.getCartById);

module.exports = router;