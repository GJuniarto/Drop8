import { defineStore } from "pinia";
import axios from "axios";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies.gjuniarto.com";

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        orders: [],
        order: {}
    }),
    actions: {
        async fetchOrdersCust() {
            try {
                const headers = { access_token: localStorage.access_token };
                const { data: response } = await axios.get(baseUrl + "/cust/orders", { headers });
                this.orders = response;
            } catch (error) {
                console.log(error);
            }
        },
        async getOrderCust(id) {
            try {
                const headers = { access_token: localStorage.access_token };
                const { data: response } = await axios.get(baseUrl + "/cust/orders/" + id, { headers });
                this.order = response;
            } catch (error) {
                console.log(error);
            }
        },
        async updateStatus(id) {
            try {
                const headers = { access_token: localStorage.access_token };
                await axios.patch(baseUrl + "/cust/orders/" + id, null, { headers });
            } catch (error) {
                console.log(error);
            }
        },
        async createPdf(dataPdf) {
            try {
                const headers = { access_token: localStorage.access_token };
                await axios.post(baseUrl + "/cust/invoices", dataPdf, { headers });
            } catch (error) {
                console.log(error);
            }
        },
        async payment(orderId, updateData, amount) {
            try {
                const headers = { access_token: localStorage.access_token };
                await axios.put(baseUrl + "/cust/orders/" + orderId, updateData, { headers });
                const { data: response } = await axios.post(baseUrl + "/cust/midtrans-token", { orderId, amount }, { headers });
                const updateStatus = this.updateStatus;
                window.snap.pay(response.token, {
                    onSuccess: function (result) {
                        /* You may add your own implementation here */
                        updateStatus(orderId);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        async addOrder(productId) {
            try {
                const headers = { access_token: localStorage.access_token };
                await axios.post(baseUrl + "/cust/orders/" + productId, null, { headers });
            } catch (error) {
                console.log(error);
            }
        }
    }
});
