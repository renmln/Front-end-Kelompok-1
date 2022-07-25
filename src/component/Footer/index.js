import React from "react";
import sosmed_facebook from "../../images/sosmed-facebook.png";
import sosmed_instagram from "../../images/sosmed-instagram.png";
import sosmed_twitter from "../../images/sosmed-twitter.png";
import sosmed_whatsapp from "../../images/sosmed-whatsapp.png";
import rectangle127 from "../../images/Rectangle127.svg";
import logo from "../../images/SecondHand1.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <section id="footer">
      <footer>
        <div className="container my-3">
          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-12">
              <ul className="list-unstyled">
                <li>
                  <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
                </li>
                <li>
                  <p>secondhand@gmail.com</p>
                </li>
                <li>
                  <p>081-233-334-808</p>
                </li>
              </ul>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-12 icon">
              <p>Contact Us :</p>
              <section>
                <a href="https://facebook.com" className="mx-1">
                  <img src={sosmed_facebook} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com" className="mx-1">
                  <img src={sosmed_instagram} alt="Facebook" />
                </a>
                <a href="https://twitter.com" className="mx-1">
                  <img src={sosmed_twitter} alt="Facebook" />
                </a>
                <a href="https://web.whatsapp.com" className="mx-1">
                  <img src={sosmed_whatsapp} alt="Facebook" />
                </a>
              </section>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-12">
              <p>Copyright Second Hand 2022</p>
              <a href="#">
                <img src={logo} alt="" style={{ width: "130px" }} />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
