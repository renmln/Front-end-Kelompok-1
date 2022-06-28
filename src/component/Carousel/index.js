import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import carosel1 from '../../images/carosel1.png'
import carosel2 from '../../images/carosel2.png';
import '../../App.css';



export default function CarouselBanner() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div style={{ display: 'block', padding: 30 }} className='karosel col-10 m-auto buttonradius20'>
                    <Carousel className='buttonradius20'>
                        <Carousel.Item interval={500} className='buttonradius20'>
                            <img
                                className="d-block w-100 img buttonradius20"
                                src={carosel1}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={500}  className='buttonradius20'>
                            <img
                                className="d-block w-100 buttonradius20"
                                src={carosel2}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>

        </div>



    )
}
