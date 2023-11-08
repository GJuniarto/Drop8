import { defineStore } from "pinia";
import axios from "axios";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies.gjuniarto.com";

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [],
        totalPages: 0
    }),
    actions: {
        async fetchProductsCust() {
            try {
                const headers = { access_token: localStorage.access_token };
                const { data: response } = await axios.get(baseUrl + "/cust/products", { headers });
                this.products = response.products;
                this.totalPages = response.totalPages;
            } catch (error) {
                console.log(error);
            }
        }
    }
});
