import React from "react";
import Carousel from "react-bootstrap/Carousel";
import carosel1 from "https://res.cloudinary.com/dg6ezwc4v/image/upload/v1658751486/samples/banner1_hlupxq.png";
import carosel2 from "../../images/banner2.png";
import carosel3 from "../../images/banner3.jpeg";
import { Container } from "react-bootstrap";
import "../../App.css";

export default function CarouselBanner() {
  return (
    <Container>
      <div className="karosel col-12 my-2">
        <Carousel className="buttonradius20">
          <Carousel.Item interval={3000} className="buttonradius20">
            <img
              className="d-block w-100 img buttonradius20"
              src={carosel1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={3000} className="buttonradius20">
            <img
              className="d-block w-100 buttonradius20"
              src={carosel2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={3000} className="buttonradius20">
            <img
              className="d-block w-100 buttonradius20"
              src={carosel3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </Container>
  );
}
