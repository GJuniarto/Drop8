<script>
import { RouterLink } from "vue-router";
import { useOrdersStore } from "../stores/order";
import { mapActions } from "pinia";

export default {
    props: ["data", "page"],
    components: { RouterLink },
    methods: {
        ...mapActions(useOrdersStore, ["addOrder", "fetchOrdersCust"]),
        async handleAddOrder() {
            await this.addOrder(this.data.id);
            await this.fetchOrdersCust();
            this.$router.push("/cust/order");
        }
    }
};
</script>

<template>
    <div v-if="page === 'home'" class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div class="h-72">
            <img class="object-cover max-w-full block" :src="data.imageUrl" alt="product image" />
        </div>
        <div class="mt-4 px-5 pb-5">
            <h5 class="text-xl tracking-tight text-slate-900">{{ data.name }}</h5>
            <div class="h-20">
                <h5 class="text-base tracking-tight text-slate-900">{{ data.description }}</h5>
            </div>
            <div class="mt-2 mb-5 flex items-center justify-between">
                <p>
                    <span class="text-3xl font-bold text-slate-900">{{
                        data.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR"
                        })
                    }}</span>
                </p>
            </div>
            <a
                @click.prevent="handleAddOrder"
                href="#"
                class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to order</a
            >
        </div>
    </div>
    <div v-if="page === 'order'" class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div class="h-72">
            <img class="object-cover max-w-full block" :src="data.Product.imageUrl" alt="product image" />
        </div>
        <div class="mt-4 px-5 pb-5">
            <h5 class="text-xl tracking-tight text-slate-900">{{ data.Product.name }}</h5>
            <div class="h-20">
                <h5 class="text-base tracking-tight text-slate-900">{{ data.Product.description }}</h5>
            </div>
            <div class="mt-2 mb-5 flex items-center justify-between">
                <p>
                    <span class="text-3xl font-bold text-slate-900">{{
                        data.Product.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR"
                        })
                    }}</span>
                </p>
            </div>
            <RouterLink
                :to="'/cust/order/' + data.id"
                class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Order detail</RouterLink
            >
        </div>
    </div>
</template>
