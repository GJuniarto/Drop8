const midtransClient = require("midtrans-client");
const { Order } = require("../models");

class MidtransController {
    static async generateToken(req, res, next) {
        const { orderId, amount } = req.body;
        try {
            const order = await Order.findByPk(orderId);
            if (order.status === "Paid") throw { name: "order_paid" };
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_APIKEY
            });
            let parameter = {
                transaction_details: {
                    order_id: "ORDER_" + orderId * (Math.random() * 10000),
                    gross_amount: amount
                },
                credit_card: {
                    secure: true
                },
                customer_details: {
                    email: req.user.email
                }
            };
            const transaction = await snap.createTransaction(parameter);
            const transaction_token = transaction.token;
            res.status(201).json(transaction);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MidtransController;
