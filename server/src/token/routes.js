const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getTokens);
router.post("/", controller.addToken);
router.get("/:email", controller.getTokenId)
router.get("/:id", controller.getTokenById);
router.put("/:id", controller.updateToken);
router.delete("/:id", controller.removeToken);

module.exports = router;