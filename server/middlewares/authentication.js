const { verifyToken } = require("../helpers/jwt");
const { Seller, Customer } = require("../models");

async function authCust(req, res, next) {
    const { access_token } = req.headers;
    try {
        if (!access_token) throw { name: "unauthorized" };
        const payload = verifyToken(access_token);

        const foundUser = await Customer.findByPk(payload.id);
        if (!foundUser) throw { name: "unauthorized" };
        if (foundUser.email !== payload.email) throw { name: "unauthorized" };
        req.user = payload;
        next();
    } catch (error) {
        next(error);
    }
}

async function authSeller(req, res, next) {
    const { access_token } = req.headers;
    try {
        if (!access_token) throw { name: "unauthorized" };
        const payload = verifyToken(access_token);

        const foundUser = await Seller.findByPk(payload.id);
        if (!foundUser) throw { name: "unauthorized" };
        if (foundUser.email !== payload.email) throw { name: "unauthorized" };
        req.user = payload;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authCust,
    authSeller
};
