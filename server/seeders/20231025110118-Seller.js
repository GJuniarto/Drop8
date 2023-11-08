"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Sellers", [
            {
                storeName: "Seller1",
                email: "seller1@mail.com",
                password: bcrypt.hashSync("seller1", 8),
                phoneNumber: "082178435677",
                address: "jl. seller no 80",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                storeName: "Seller2",
                email: "seller2@mail.com",
                password: bcrypt.hashSync("seller2", 8),
                phoneNumber: "082178435877",
                address: "jl. seller no 81",
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
        await queryInterface.bulkDelete("Sellers", null);
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
