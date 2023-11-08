const router = require("express").Router();
const custRouter = require("./cust");
const sellRouter = require("./sell");

router.use("/cust", custRouter);
router.use("/sell", sellRouter);

module.exports = router;
