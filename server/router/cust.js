const CustomerController = require("../controllers/CustomerController");
const MidtransController = require("../controllers/MidtransController");
const OrderController = require("../controllers/OrderController");
const ProductController = require("../controllers/ProductController");

const { authCust } = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", CustomerController.login);
router.post("/register", CustomerController.register);

router.use(authCust);
router.get("/products", ProductController.findAllCust);

router.post("/orders/:ProductId", OrderController.createOrder);
router.get("/orders", OrderController.findAllCust);
router.get("/orders/:id", OrderController.findOrder);
router.put("/orders/:id", OrderController.updateOrder);
router.patch("/orders/:id", OrderController.changeStatusOrder);

router.post("/midtrans-token", MidtransController.generateToken);

router.post("/invoices", OrderController.createInvoice);
module.exports = router;
