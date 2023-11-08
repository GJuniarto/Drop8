<script>
import Navbar from "../components/Navbar.vue";
import Card from "../components/Card.vue";

import { useProductsStore } from "../stores/product";
import { mapActions, mapState } from "pinia";

export default {
    components: {
        Navbar,
        Card
    },
    computed: {
        ...mapState(useProductsStore, ["products"])
    },
    methods: {
        ...mapActions(useProductsStore, ["fetchProductsCust"])
    },
    created() {
        this.fetchProductsCust();
    }
};
</script>
<template>
    <Navbar />
    <div class="container mx-auto px-28">
        <div class="py-8">
            <h1 class="text-5xl">Products</h1>
        </div>
        <div class="py-8">
            <div class="grid grid-cols-4 gap-4">
                <Card v-for="product in products" :key="product.id" :data="product" page="home" />
            </div>
        </div>
    </div>
</template>
