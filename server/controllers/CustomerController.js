const { Customer } = require("../models");
const { createToken } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");

class CustomerController {
    static async login(req, res, next) {
        const { email, password } = req.body;
        console.log(req.body);

        try {
            if (!email || !password) throw { name: "email_password" };
            const user = await Customer.findOne({ where: { email } });
            // If user not found
            if (!user) throw { name: "email_password" };

            const isValidPassword = bcrypt.compareSync(password, user.password);

            // If wrong password
            if (!isValidPassword) throw { name: "email_password" };

            const payload = { id: user.id, email: user.email };
            const token = createToken(payload);
            res.json({ access_token: token });
        } catch (err) {
            next(err);
        }
    }

    static async register(req, res, next) {
        const { email, password, phoneNumber, address, firstName, lastName } = req.body;

        try {
            const user = await Customer.create({ email, password, phoneNumber, address, firstName, lastName });
            const payload = { id: user.id, email: user.email };
            const token = createToken(payload);
            res.json({ access_token: token });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CustomerController;
