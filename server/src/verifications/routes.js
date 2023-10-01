const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.post("/", controller.addVerification);
router.post("/email-date", controller.updateEmailDate);
router.post("/token-date", controller.updateTokenDate);
router.post("/token", controller.createToken);
router.post("/email", controller.sendEmail);
router.get("/:id", controller.getVerificationById);
router.delete("/:id", controller.deleteVerificationById);

module.exports = router;