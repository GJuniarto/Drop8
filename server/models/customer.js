"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Customer.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Email is required"
                    },
                    notEmpty: {
                        msg: "Email is required"
                    },
                    isEmail: {
                        msg: "Email must be in email format"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Email is required"
                    },
                    notEmpty: {
                        msg: "Email is required"
                    }
                }
            },
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING
        },
        {
            hooks: {
                beforeCreate(cust, option) {
                    const hashPass = require("bcryptjs").hashSync(cust.password, 8);
                    cust.password = hashPass;
                }
            },
            sequelize,
            modelName: "Customer"
        }
    );
    return Customer;
};
