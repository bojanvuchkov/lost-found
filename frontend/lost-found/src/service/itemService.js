import axios from "../custom-axios/axios";

const userService = {
    fetchItems: () => {
        return axios.get("/items")
    },
    // fetchCategories: () => {
    //     return axios.get("/categories");
    // },
    // fetchProducts: () => {
    //     return axios.get("/products");
    // },
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
        return axios.post("/login", {
            "username": username,
            "password": password
        });
    },
    getUser: () => {
        //TODO change with actual ID
        let resp = axios.get("/users/riste.stojanov");
        console.log(resp);
        return resp;
    }
}

export default userService;
