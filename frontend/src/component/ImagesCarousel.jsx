import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './styles.css';


const ImagesCarousel = ({ product }) => {
  return (
    <>
        <Carousel>
            <Carousel.Item>
                <img src={product.images[0]} className="d-block w-100"/>
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={product.images[1]} className="d-block w-100"/>
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={product.images[2]} className="d-block w-100"/>
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
  )
}

export default ImagesCarousel
