import express from "express"
import stuffCtrl from "../controllers/stuff.js";
import auth from "../middlewares/auth.js"

const router = express.Router()


router.post("/", auth, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

export default router