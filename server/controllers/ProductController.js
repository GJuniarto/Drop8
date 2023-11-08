const { Product, Seller } = require("../models");
const { pagination, getPagingData } = require("../helpers/pagination");

class ProductController {
    static async findAllCust(req, res, next) {
        const { page } = req.query;
        try {
            const { limit, offset } = pagination(page, 8);
            const option = { limit, offset, include: { model: Seller, attributes: ["storeName", "email", "phoneNumber", "address"] }, order: [["id", "ASC"]] };
            const response = await Product.findAndCountAll(option);
            const products = getPagingData(response, page, limit);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
    static async findAllSeller(req, res, next) {
        try {
            const SellerId = req.user.id;
            const option = { where: { SellerId }, include: { model: Seller, attributes: ["storeName", "email", "phoneNumber", "address"] } };

            const products = (await Product.findAll(option)).map((product) => {
                const formatPrice = product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
                product.price = formatPrice;
                return product;
            });
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;
