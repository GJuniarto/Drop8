<script>
import { useUsersStore } from "../stores/user";
import { mapActions, mapWritableState } from "pinia";

export default {
    data() {
        return {
            formRegister: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phoneNumber: "",
                address: ""
            }
        };
    },
    methods: {
        ...mapActions(useUsersStore, ["registerCust"]),
        async handlerSubmitRegister() {
            try {
                await this.registerCust(this.formRegister);
                this.isLogin = true;
                this.$router.push("/cust/home");
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        ...mapWritableState(useUsersStore, ["isLogin"])
    }
};
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Register your account</h1>
                    <form @submit.prevent="handlerSubmitRegister" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                v-model="formRegister.firstName"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John" />
                        </div>
                        <div>
                            <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                v-model="formRegister.lastName"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Doe" />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                v-model="formRegister.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                v-model="formRegister.password"
                                id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                v-model="formRegister.phoneNumber"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="083184329823" />
                        </div>
                        <div>
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                v-model="formRegister.address"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="083184329823" />
                        </div>
                        <button
                            type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
