import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartEmpty, setCartEmpty] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart).map(item => ({
                ...item,
                quantity: item.quantity || 1,
                totalPrice: item.price * (item.quantity || 1)
            }));
            setCartItems(parsedCart);
        }
    }, []);

    const updateCartAndLocalStorage = (updatedCart) => {
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartEmpty(updatedCart.length === 0);
    };

    const incrementQuantity = (id) => {
        const updatedCart = cartItems.map(cartItem => {
            if (cartItem.id === id) {
                const newQuantity = cartItem.quantity + 1;
                return {
                    ...cartItem,
                    quantity: newQuantity,
                    totalPrice: (cartItem.price * newQuantity).toFixed(2)
                };
            }
            return cartItem;
        });
        updateCartAndLocalStorage(updatedCart);
    };

    const decrementQuantity = (id) => {
        const updatedCart = cartItems.map(cartItem => {
            if (cartItem.id === id && cartItem.quantity > 1) {
                const newQuantity = cartItem.quantity - 1;
                return {
                    ...cartItem,
                    quantity: newQuantity,
                    totalPrice: (cartItem.price * newQuantity).toFixed(2)
                };
            }
            return cartItem;
        });
        updateCartAndLocalStorage(updatedCart);
    };

    const removeAll = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
        setCartEmpty(true);
    };

    const removeProduct = (id) => {
        try {
            const updatedCart = cartItems.filter(item => item.id !== id);
            updateCartAndLocalStorage(updatedCart);
        } catch (error) {
            console.error("An error occurred while removing the product:", error);
        }
    };

    return (
        <div className='container' style={{ backgroundColor: '#ffff', marginTop: '12vh' }}>
            <Navbar cartEmpty={cartEmpty} />
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div>
                        <ul className="list-group list-group-flush" style={{ marginTop: '12vh' }}>
                            <div className='row d-flex'>
                                <div className="col-md-6">
                                    <h5>
                                        Cart ({cartItems.length})
                                    </h5>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        onClick={removeAll}
                                        className="btn btn-link fs-6 text-decoration-none text-warning float-end">
                                        Remove All
                                    </button>
                                </div>
                            </div>

                            {cartEmpty ? (
                                <Link className='btn btn-warning align-items-center' to={`/`}>
                                    Continue Shopping
                                </Link>
                            ) : (
                                cartItems.map(cartItem => (
                                    <div key={cartItem.id} className='my-3'>
                                        <div className='row g-0'>
                                            <div className="col-md-3">
                                                <img
                                                    src={cartItem.images[0]}
                                                    className="img-fluid rounded w-50"
                                                    alt={cartItem.title}
                                                />
                                            </div>
                                            <div className="col-md-4 mx-3 fs-6">
                                                <p className='card-text'>
                                                    {cartItem.description}
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className='card-title float-end mt-3'>
                                                    $ {cartItem.totalPrice}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className='row g-0'>
                                            <div className="col-md-6">
                                                <DeleteIcon
                                                    onClick={() => removeProduct(cartItem.id)}
                                                    className='mt-3'
                                                    color='warning'
                                                    sx={{ fontSize: 20 }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <div className='card-title d-flex float-end mt-3 mx-3'>
                                                    <RemoveCircleIcon
                                                        sx={{ fontSize: 20 }}
                                                        color='warning'
                                                        onClick={() => decrementQuantity(cartItem.id)}
                                                    />
                                                    <h6 className='mx-3'>{cartItem.quantity}</h6>
                                                    <AddCircleIcon
                                                        sx={{ fontSize: 20 }}
                                                        color='warning'
                                                        onClick={() => incrementQuantity(cartItem.id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
