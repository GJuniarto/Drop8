"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.Product);
            Order.belongsTo(models.Customer);
        }
    }
    Order.init(
        {
            ProductId: DataTypes.INTEGER,
            CustomerId: DataTypes.INTEGER,
            status: DataTypes.STRING,
            senderName: DataTypes.STRING,
            address: DataTypes.STRING,
            quantity: DataTypes.INTEGER
        },
        {
            hooks: {
                beforeCreate(order, option) {
                    order.status = "Unpaid";
                }
            },
            sequelize,
            modelName: "Order"
        }
    );
    return Order;
};
