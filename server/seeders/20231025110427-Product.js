"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const products = require("../data/products.json").map((product) => {
            const obj = {};
            obj.name = product.title;
            obj.description = product.description;
            obj.price = product.price * 15000;
            obj.stock = product.stock;
            obj.imageUrl = product.thumbnail;
            obj.SellerId = Math.ceil(Math.random() * 2);
            obj.createdAt = obj.updatedAt = new Date();
            return obj;
        });
        await queryInterface.bulkInsert("Products", products);
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
        await queryInterface.bulkDelete("Products", null);
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
