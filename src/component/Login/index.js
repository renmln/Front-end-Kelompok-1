import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../images/img.png";
import "../../css/style.css";
import icon from "../../images/img.png";

// Redux Action
import {login} from "../../redux/actions/authActions";

export default function Login() {
    const dispatch = useDispatch();
    const {isAuthenticated, status} = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        const data = {
            email,
            password,
        };
        dispatch(login(data));
    }

    if (status === "OK") {
        return <Navigate to={`/`} />;
    }

    return (
        <section className="Form my-4 mx-5">
            <div className="container">
                <div className="row rowlogin no-gutters">
                    <div className="col-lg-5">
                        <img className="img-fluid img1" src={icon} alt="" />
                    </div>
                    <div className="col-lg-7 px-5 pt-5">
                        <h1 className="font-weight-bold py-3">Masuk</h1>
                        {!isAuthenticated ? (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <label className="fw-bold my-0">Email</label>
                                        <input
                                            type="email"
                                            placeholder="johndee@gmail.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control my-3 p-4 buttonradius16 mt-0"
                                            value={email}
                                            style={{height: "48px"}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <label className="fw-bold my-0">Password</label>
                                        <input
                                            type="password"
                                            placeholder="Masukkan Password"
                                            className="form-control my-3 p-4 buttonradius16 mt-0"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            style={{height: "48px"}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <button type="button" className="btn1 mt-3 mb-2 buttonradius16" style={{height: "48px"}} onClick={() => handleSubmit()}>
                                            Masuk
                                        </button>
                                    </div>
                                </div>
                                <p className="my-1">
                                    Belum punya akun?{" "}
                                    <a href="/regis" className=" fw-bold" style={{color: "#7126B5"}}>
                                        Daftar disini
                                    </a>
                                </p>
                            </form>
                        ) : (
                            <Navigate to="/" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
