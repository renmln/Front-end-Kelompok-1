import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { LandingPage, HalamanProduk, Login, Regis, InfoProduk, DaftarJual } from './component';
import { InfoProfil } from './component';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/regis" element={<Regis />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/halamanproduk" element={<HalamanProduk />} />
      <Route path="/infoprofil" element={<InfoProfil />} />
      <Route path="/infoproduk" element={<InfoProduk />} />
      <Route path="/daftarjual" element={<DaftarJual />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();