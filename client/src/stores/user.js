import { defineStore } from "pinia";
import axios from "axios";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies.gjuniarto.com";

export const useUsersStore = defineStore("users", {
    state: () => ({
        isLogin: false,
        role: ""
    }),
    actions: {
        async loginCust(email, password) {
            try {
                const { data } = await axios.post(baseUrl + "/cust/login", { email, password });
                const { access_token } = data;
                localStorage.setItem("access_token", access_token);
                this.role = "cust";
            } catch (error) {
                console.log(error);
            }
        },
        async registerCust(formRegister) {
            try {
                const { data } = await axios.post(baseUrl + "/cust/register", formRegister);
                const { access_token } = data;
                localStorage.setItem("access_token", access_token);
                this.role = "cust";
            } catch (error) {
                console.log(error);
            }
        }
    }
});
