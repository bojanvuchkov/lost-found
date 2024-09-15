import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ItemsPage from "../items-page/ItemsPage";
import Header from "../header/header";
import Login from '../login/login';
import AddItem from "../items-page/AddItem";
import UserDetails from "../users/Details";
import React from "react";
import Mail from "../users/Mail";
import ItemDetailsPage from "../items-page/ItemDetailsPage";

const App = () => {
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

  // const deleteProduct = (id) => {
  //   EShopService.deleteProduct(id)
  //       .then(() => {
  //         loadProducts();
  //       });
  // };
  //
  // const addItems = (name, price, quantity, category, manufacturer) => {
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
                      <Route path="/items" element={<ItemsPage categories={categories}/>} />
                      <Route path="/items/add" element={<AddItem categories={categories} />} />
                      <Route path="/items/edit/:id" element={<AddItem categories={categories} />} />
                      <Route path="/items/:id" element={<ItemDetailsPage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/users/:id" element={<UserDetails />} />
                      <Route path="/users/contact/:id" element={<Mail />} />
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
