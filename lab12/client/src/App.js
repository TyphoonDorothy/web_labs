import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/home/header";
import Home from "./components/home/home"; // Import Home
import Catalog from "./components/catalog/catalog";
import { CatalogProvider } from "./components/catalog/catalog_context";
import { ItemsProvider } from "./components/item/item_context";
import Item from "./components/item/item";
import Cart from "./components/cart/cart";
import Checkout from "./components/checkout/checkout";
import Success from "./components/success/success";
import Login from "./components/login/login";
import Register from "./components/register/register";
import ProtectedRoute from "./components/protected_route/protected_route";
import "./App.css";

const App = () => {
  return (
    <Router>
      <CatalogProvider>
        <ItemsProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<Home />} />

            <Route
              path="/catalog"
              element={
                <ProtectedRoute>
                  <Catalog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/:id"
              element={
                <ProtectedRoute>
                  <Item />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ItemsProvider>
      </CatalogProvider>
    </Router>
  );
};

export default App;
