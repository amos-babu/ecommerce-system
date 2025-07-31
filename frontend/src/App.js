import { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import Products from './component/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Item from './component/Item';
import PrivateRoutes from './component/Auth/PrivateRoutes';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Profile from './component/Auth/Profile';
import Cart from './component/Cart';
import { useCart } from './component/CartContext';
import { Alert } from 'bootstrap';
import { AuthProvider } from './component/AuthContext';

function App() {
    const { showAlert, setShowAlert} = useCart();
    const [loggedIn, setLoggedIn] = useState(false);

    const loginState = () => setLoggedIn(true);
    const logoutState = () => setLoggedIn(false);


  return (
        <div
            className='container-fluid'
            style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>

            {showAlert && (
                <div
                    className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3"
                    role="alert"
                    style={{ zIndex: 1050 }}
                >
                    Product added to cart successfully!
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowAlert(false)}
                    >
                    </button>
                </div>
            )}
            <AuthProvider>
                <Navbar logoutState= {logoutState} loggedIn= {loggedIn}/>
                    <Routes>
                        <Route path='/' element = {<Products/>}/>
                        <Route path='/login' element = {<Login loginState ={loginState} />}/>
                        <Route path='/register' element = {<Register />}/>
                        <Route path='/cart' element = {<Cart />}/>
                        <Route path='/:id/product' element = {<Item/>}/>
                        <Route element = {<PrivateRoutes />}>
                            <Route path='/:id' element = {<Profile />}/>
                        </Route>
                    </Routes>
            </AuthProvider>
        </div>
  );
}

export default App;
