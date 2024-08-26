import './App.css';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, RedirectFunction, Routes} from 'react-router-dom';
import ItemsPage from "../items-page/ItemsPage";
import itemService from "../../service/itemService";
import Header from "../header/header";

const App = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [emails, setEmails] = useState([]);
  const categories = [
      'PHONES',
      'LAPTOPS',
      'CAMERAS',
      'HEADPHONES',
      'CHARGERS',
      'STATIONERY',
      'DOCUMENTS',
      'CLOTHING',
      'ACCESSORIES',
      'BAGS',
      'OTHER'
  ]

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    loadItems();
    // loadEmails()
  };

  const loadItems = () => {
    itemService.fetchItems()
        .then((data) => {
          setItems(data.data.content);
        });
  };


  // const loadUsers = () => {
  //   userService.fetchUsers()
  //       .then((data) => {
  //         setUsers(data.data);
  //       });
  // };
  //
  // const loadEmails = () => {
  //   emailService.fetchEmails()
  //       .then((data) => {
  //         setEmails(data.data);
  //       });
  // };

  // const deleteProduct = (id) => {
  //   EShopService.deleteProduct(id)
  //       .then(() => {
  //         loadProducts();
  //       });
  // };
  //
  // const addProduct = (name, price, quantity, category, manufacturer) => {
  //   EShopService.addProduct(name, price, quantity, category, manufacturer)
  //       .then(() => {
  //         loadProducts();
  //       });
  // };
  //
  // const getProduct = (id) => {
  //   EShopService.getProduct(id)
  //       .then((data) => {
  //         setSelectedProduct(data.data);
  //       });
  // };
  //
  // const editProduct = (id, name, price, quantity, category, manufacturer) => {
  //   EShopService.editProduct(id, name, price, quantity, category, manufacturer)
  //       .then(() => {
  //         loadProducts();
  //       });
  // };

  return (
      <Router>
        <Header />
        <main>
          <div className="container">
              {/*<Router>*/}
                  <Routes>
                      <Route path="/items" element={<ItemsPage items={items} categories={categories}/>} />
                      {/* other routes */}
                  </Routes>
              {/*</Router>*/}
              {/*<Routes>*/}
            {/*<Route path={"/items"} exact render={() =>*/}
            {/*    <ItemsPage items={items} />} />*/}
            {/*  </Routes>*/}
            {/*<Route path={"/categories"} exact render={() =>*/}
            {/*    <Categories categories={categories} />} />*/}
            {/*<Route path={"/products/add"} exact render={() =>*/}
            {/*    <ProductAdd categories={categories}*/}
            {/*                manufacturers={manufacturers}*/}
            {/*                onAddProduct={addProduct} />} />*/}
            {/*<Route path={"/products/edit/:id"} exact render={() =>*/}
            {/*    <ProductEdit categories={categories}*/}
            {/*                 manufacturers={manufacturers}*/}
            {/*                 onEditProduct={editProduct}*/}
            {/*                 product={selectedProduct} />} />*/}
            {/*<Route path={"/products"} exact render={() =>*/}
            {/*    <Products products={products}*/}
            {/*              onDelete={deleteProduct}*/}
            {/*              onEdit={getProduct} />} />*/}
            {/*<Route path={"/login"} exact render={() => <Login onLogin={fetchData} />} />*/}
            {/*<Redirect to={"/items"} />*/}
          </div>
        </main>
      </Router>
  );
};

export default App;
