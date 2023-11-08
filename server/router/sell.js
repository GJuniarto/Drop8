const OrderController = require("../controllers/OrderController");
const ProductController = require("../controllers/ProductController");
const SellerController = require("../controllers/SellerController");

const { authSeller } = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", SellerController.login);
router.post("/register", SellerController.register);

router.use(authSeller);

router.get("/products", ProductController.findAllSeller);

router.get("/orders/:id", OrderController.findOrder);
router.get("/orders", OrderController.findAllSeller);

module.exports = router;
