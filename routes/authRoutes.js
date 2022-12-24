import express from "express";
const router = express.Router();

import {register,login,updateUser} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js"

router.route('/register').post(register); // public route
router.route('/login').post(login); // public route
router.route('/updateUser').patch(authenticateUser,updateUser); // private route -- restricted to users

export default router;