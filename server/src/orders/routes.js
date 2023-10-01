const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/rates", controller.getRates);
router.get("/:id", controller.getOrderById);
router.get("/", controller.getOrders);

router.post("/", controller.addOrder);

module.exports = router;
