import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {Provider} from "react-redux";
import store from "./redux/store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import reportWebVitals from "./reportWebVitals";
import {LandingPage, HalamanProduk, Login, Regis, InfoProduk, DaftarJual} from "./component";
import {InfoProfil} from "./component";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/regis" element={<Regis />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/halamanproduk/:id" element={<HalamanProduk />} />
                <Route path="/infoprofil" element={<InfoProfil />} />
                <Route path="/infoproduk" element={<InfoProduk />} />
                <Route path="/daftarjual" element={<DaftarJual />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
