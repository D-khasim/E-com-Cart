// routes/cartRoutes.js
import express from 'express';
import { addToCart, getCart, removeFromCart, incrementquantity, decrementquantity} from '../controllers/cartcontroller.js';
const router = express.Router();

router.post('/', addToCart);
router.get('/', getCart);
router.delete('/:productId', removeFromCart);
router.post("/increment/:productId",incrementquantity);
router.post("/decrement/:productId",decrementquantity);

export default router;
