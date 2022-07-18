import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  updateInfoUsers,
  login,
  sendLink,
} from "../../redux/actions/authActions";
import axios from "axios";

const LupaPassword = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const kirim = () => {
    if (!email) {
      setError("Email wajib diisi");
    } else {
      const token = localStorage.getItem("token");
      console.log(token);
      const updateLink = {
        email: email,
        resetPasswordLink: token,
      };
      dispatch(sendLink(dispatch(updateInfoUsers(updateLink)))).then(
        (response) => {
          setEmail("");
          setAlert("silahkan cek email anda");
          setTimeout(() => {
            setAlert("");
          }, 3000);
        }
      );
    }
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              {alert && (
                <div className="alert alert-success">
                  <p>{alert}</p>
                </div>
              )}
              {error && (
                <div className="alert alert-danger">
                  <p>{error}</p>
                </div>
              )}

              <div className="card-body">
                <div className="form-group">
                  <center>
                    <h1>Lupa Password</h1>
                  </center>
                  <center>
                    <p>Silahkan cek email di Kotak Masuk dan SPAM!</p>
                  </center>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Masukkan email"
                    className="form-control"
                    value={email}
                    onChange={changeEmail}
                  />
                </div>

                <button className="btn btn-primary" onClick={kirim}>
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LupaPassword;
