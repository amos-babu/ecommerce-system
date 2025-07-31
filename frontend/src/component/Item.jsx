import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useCart } from './CartContext';
import ImagesCarousel from './ImagesCarousel';

const Item = () => {
    const location = useLocation();
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(location.state?.product || null);
    const [loading, setLoading] = useState(!product);
    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if(storedCart){
            setCartItem(storedCart);
        }
        if (!product) {
            axios.get(`https://dummyjson.com/products/${id}`)
                .then(response => {
                    // console.log(response.data);
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                });
        }
    }, [id, product]);

    if (!product) {
        return <div>No product data available</div>;
    }

    const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
        return (discountedPrice / (1 - discountPercentage / 100)).toFixed(2);
    };

    return (
        <div>
            <Navbar/>
                { loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div
                        className='row justify-content-center align-items-center'
                        style={{ marginTop: '5rem'}}>
                        <div className="col-md-10">
                            <div className="card mx-auto text-center border-0 mt-3"
                                style={{ marginTop: '2rem' }}>
                                <div className="row">
                                    <div className='col-md-5 mx-3' style={{ marginTop: '2rem' }}>
                                        <ImagesCarousel product = { product }/>
                                    </div>
                                    <div className='col' style={{ marginTop: '2rem' }}>
                                        <div className="card-body d-flex flex-column">
                                            <p className="fw-bold fs-4">{product.title}</p>
                                            <p className="fw-lighter fs-6">{product.category}</p>
                                            <p className="fw-lighter fs-6">{product.warrantyInformation}</p>
                                            <p className="card-text">{product.description}</p>
                                        </div>
                                    </div>
                                    <div className='col' style={{ marginTop: '2rem' }}>
                                        <div className="card-body d-flex flex-column">
                                            <p className="fw-bold fs-2">$ {product.price}</p>
                                            <p className="fw-lighter text-decoration-line-through">$ {calculateOriginalPrice(product.price, product.discountPercentage)}</p>
                                            <p className="fw-lighter badge bg-primary text-wrap">In Stock - {product.stock}</p>
                                            <p className="fw-lighter fs-6">{product.shippingInformation}</p>
                                            <p className="fw-bold fs-6">{product.returnPolicy}</p>
                                            <p className="fw-bold fs-6">{product.meta.barcode}</p>
                                        </div>
                                            <img src={product.meta.qrCode} className="d-block w-100"/>
                                    </div>
                                        <div className="my-3">
                                            <button
                                                className="fw-bold btn btn-warning rounded-pill w-100"
                                                onClick={() => addToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

        </div>
    );
};

export default Item;
