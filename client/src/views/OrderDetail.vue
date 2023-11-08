<script>
import Navbar from "../components/Navbar.vue";
import Card from "../components/Card.vue";

import { useOrdersStore } from "../stores/order";
import { mapActions, mapState } from "pinia";

export default {
    data() {
        return {
            address: "",
            senderName: "",
            quantity: ""
        };
    },
    components: {
        Navbar,
        Card
    },
    computed: {
        ...mapState(useOrdersStore, ["order"])
    },
    methods: {
        ...mapActions(useOrdersStore, ["getOrderCust", "payment"]),
        async handlerOrder() {
            const orderId = this.$route.params.id;
            const updateData = { senderName: this.senderName, address: this.address, quantity: this.quantity };
            const amount = this.order.Product.price * this.quantity;

            await this.payment(orderId, updateData, amount);
            await this.getOrderCust(this.$route.params.id);
        }
    },
    async created() {
        const { id } = this.$route.params;
        await this.getOrderCust(id);
        this.address = this.order.address;
        this.senderName = this.order.senderName;
        this.quantity = this.order.quantity;
    }
};
</script>

<template>
    <Navbar />
    <div class="container mx-auto px-28">
        <div class="py-8">
            <h1 class="text-5xl">Order Detail</h1>
        </div>
        <div class="py-8">
            <div><img :src="order.Product.imageUrl" /></div>
            <div class="my-4">
                <span class="text-2xl">{{ order.Product.name }}</span>
            </div>
            <div class="my-4">
                <span class="text-xl"
                    >Price:
                    {{
                        order.Product.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR"
                        })
                    }}</span
                >
            </div>
            <div v-if="order.status === 'Paid'" class="my-4">
                <div class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg
                        class="flex-shrink-0 inline w-4 h-4 mr-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div><span class="font-medium">Paid!</span> Your order is already paid!</div>
                </div>
            </div>
            <div v-if="order.status === 'Unpaid'" class="my-4">
                <form @submit.prevent="handlerOrder">
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Sender Name</label>
                        <input
                            type="text"
                            id="email"
                            v-model="senderName"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required />
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <input
                            type="text"
                            id="password"
                            v-model="address"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required />
                    </div>
                    <div class="mb-6">
                        <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                        <input
                            type="number"
                            id="repeat-password"
                            v-model="quantity"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required />
                    </div>
                    <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Pay
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
