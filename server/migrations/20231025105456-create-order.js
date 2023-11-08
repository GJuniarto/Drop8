"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ProductId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Products",
                    key: "id"
                }
            },
            CustomerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Customers",
                    key: "id"
                }
            },
            status: {
                type: Sequelize.STRING
            },
            senderName: {
                type: Sequelize.STRING
            },

            address: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Orders");
    }
};
