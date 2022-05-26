import React from 'react';
import './styles/ice-cream.scss';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EditIceCream from './ice-cream/EditIceCream';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Menu />} />
        <Route path="/menu-items/:menuItemId" element={<EditIceCream />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
