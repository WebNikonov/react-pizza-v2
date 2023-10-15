import React from 'react';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import NotFound from './Pages/NotFound.jsx';

import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import FullPizza from './Components/FullPizza';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:pizzaId" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
