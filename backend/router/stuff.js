import express from "express"
import auth from "../middlewares/auth.js"
import multer from "../middlewares/multer-config.js";
import stuffCtrl from "../controllers/stuff.js";


const router = express.Router()

router.get("/", auth, stuffCtrl.getAllThings);
router.post("/", auth, multer, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

export default router