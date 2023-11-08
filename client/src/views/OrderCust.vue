<script>
import Navbar from "../components/Navbar.vue";
import Card from "../components/Card.vue";

import { useOrdersStore } from "../stores/order";
import { mapActions, mapState } from "pinia";

export default {
    components: {
        Navbar,
        Card
    },
    computed: {
        ...mapState(useOrdersStore, ["orders"])
    },
    methods: {
        ...mapActions(useOrdersStore, ["fetchOrdersCust"])
    },
    created() {
        this.fetchOrdersCust();
    }
};
</script>

<template>
    <Navbar />
    <div class="container mx-auto px-28">
        <div class="py-8">
            <h1 class="text-5xl">Orders</h1>
        </div>
        <div class="py-8">
            <div class="grid grid-cols-4 gap-4">
                <Card v-for="order in orders" :key="order.id" :data="order" page="order" />
            </div>
        </div>
    </div>
</template>
