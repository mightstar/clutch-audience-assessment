import express from "express";
import Auth from "../../controllers/authControllers";
import auth from "../../middleware/authmiddleware";

const router = express.Router();

router.get("/api/v1/user/:id", Auth.show);
router.post("/api/v1/user/register", Auth.create);
router.patch("/api/v1/user/:id", Auth.update);
router.post("/api/v1/user/login", Auth.login);
router.delete("/api/v1/user/:id", Auth.deleteUser);

router.get("/api/v1/users", auth, Auth.index);

export default router;
