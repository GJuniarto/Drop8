const { Order, Product, Customer } = require("../models");
const createPdf = require("../helpers/pdf");

class OrderController {
    static async createOrder(req, res, next) {
        const { ProductId } = req.params;
        const CustomerId = req.user.id;
        const { address, senderName, quantity } = req.body;
        try {
            const createdOrder = await Order.create({ ProductId, CustomerId, address, senderName, quantity });
            res.status(201).json(createdOrder);
        } catch (error) {
            next(error);
        }
    }

    static async findAllCust(req, res, next) {
        const CustomerId = req.user.id;
        try {
            const orders = await Order.findAll({ where: { CustomerId }, include: Product });
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async findAllSeller(req, res, next) {
        const SellerId = req.user.id;
        try {
            const orders = await Order.findAll({ include: { model: Product, where: { SellerId } } });
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async findOrder(req, res, next) {
        const { id } = req.params;
        try {
            const order = await Order.findByPk(id, { include: [Product, Customer] });
            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    static async updateOrder(req, res, next) {
        const { id } = req.params;
        const { senderName, address, quantity } = req.body;
        try {
            await Order.update({ senderName, address, quantity }, { where: { id } });
            res.json({ message: "Order updated successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async changeStatusOrder(req, res, next) {
        const { id } = req.params;
        try {
            await Order.update({ status: "Paid" }, { where: { id } });
            res.json({ message: "Order is paid" });
        } catch (error) {
            next(error);
        }
    }

    static async createInvoice(req, res, next) {
        const { orderId, data } = req.body;
        try {
            const order = await Order.findByPk(orderId, { include: Product });
            const date = new Date(order.createdAt).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
            const dataPdf = { ...data, productName: order.Product.name, date, id: orderId };
            console.log(dataPdf);
            createPdf(dataPdf, orderId);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = OrderController;
