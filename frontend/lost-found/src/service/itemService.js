import axios from "../custom-axios/axios";

const userService = {
    fetchItems: () => {
        return axios.get("/items")
    },
    deleteItem: (id) => {
        return axios.delete(`/items/delete/${id}`);
    },
    addItem: (name, price, quantity, category, manufacturer) => {
        return axios.post("/products/add", {
            "name": name,
            "price": price,
            "quantity": quantity,
            "category": category,
            "manufacturer": manufacturer
        });
    },
    // editProduct: (id, name, price, quantity, category, manufacturer) => {
    //     return axios.put(`/products/edit/${id}`, {
    //         "name": name,
    //         "price": price,
    //         "quantity": quantity,
    //         "category": category,
    //         "manufacturer": manufacturer
    //     });
    // },
    // getProduct: (id) => {
    //     return axios.get(`/products/${id}`);
    // },
    login: (username, password) => {
        return axios.post("/auth/login", {
            "email": username,
            "password": password
        });
    },
    getUser: (id) => {
        return axios.get(`/users/${id}`);
    },
    getReceiver: (id) => {
        return axios.get(`/users/contact/${id}`);
    },
    deleteMessage: (id, messageId) => {
        return axios.delete(`/users/${id}/deleteMessage/${messageId}`)
    }
}

export default userService;
