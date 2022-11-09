import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Compras } from "./pages/Compras";
import { Inventario } from "./pages/Inventario";
import { Contratistas } from "./pages/Contratistas";
import { Presupuestos } from "./pages/Presupuestos";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Compras />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/contratistas" element={<Contratistas />} />
      <Route path="/presupuestos" element={<Presupuestos />} />
    </Routes>
  );
};
