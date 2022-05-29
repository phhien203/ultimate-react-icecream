import React from 'react';
import './styles/ice-cream.scss';
import Header from './structure/Header';
import Footer from './structure/Footer';
import IceCreamMenu from './ice-cream/IceCreamMenu';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EditIceCream from './ice-cream/EditIceCream';
import IceScreams from './ice-cream/IceScreams';
import AddIceCream from './ice-cream/AddIceCream';

function App() {
  return (
    <BrowserRouter>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Routes>
        <Route path="/" exact element={<IceCreamMenu />} />
        <Route path="ice-creams" element={<IceScreams />} />
        <Route path="/menu-items/add" exact element={<AddIceCream />} />
        <Route path="/menu-items/:menuItemId" element={<EditIceCream />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
