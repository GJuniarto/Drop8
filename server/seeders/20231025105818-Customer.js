"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Customers", [
            {
                firstName: "Customer",
                lastName: "1",
                email: "customer1@mail.com",
                password: bcrypt.hashSync("customer1", 8),
                phoneNumber: "082178435267",
                address: "jl. pemuda no 80",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: "Customer",
                lastName: "2",
                email: "customer2@mail.com",
                password: bcrypt.hashSync("customer2", 8),
                phoneNumber: "082178435287",
                address: "jl. pemuda no 81",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Customers", null);
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
