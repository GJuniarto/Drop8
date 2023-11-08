<script>
import { RouterLink, RouterView } from "vue-router";
import { useUsersStore } from "./stores/user";
import { mapWritableState } from "pinia";
export default {
    computed: {
        ...mapWritableState(useUsersStore, ["role"])
    },
    created() {
        if (window.location.href.includes("/cust/")) {
            this.role = "cust";
        } else if (window.location.href.includes("/seller/")) {
            this.role = "seller";
        }
    }
};
</script>

<template>
    <RouterView />
</template>
