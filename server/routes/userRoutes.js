const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

//Delete all users
router.delete("/delete", userController.deleteAllUsers);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgotpass", userController.forgotPass);

router.post("/emailconfirm", userController.emailConfirm);
router.get("/list", userController.getAllUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
