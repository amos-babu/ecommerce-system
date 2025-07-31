import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import { Dropdown } from 'react-bootstrap';
import SearchProducts from './SearchProducts';
import { useAuth } from './AuthContext';


const Navbar = ({ cartEmpty }) => {
    const {loggedIn, logout,} = useAuth();
    const { cart } = useCart();
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/user`);
            setUser(response.data.data);
         } catch (error) {
             console.log(error);
         };
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = () => {
        axios.post(`/api/logout/`)
        .then((res) => {
            localStorage.removeItem('token');
            logout();
        })
        .catch((err) =>{
            console.log('Error fetching user data:', err);
        })
    };



    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -2,
          top: 4,
          border: `2px solid ${theme.palette.background}`,
          padding: '0 4px',
        },
      }));
  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
            <div className="container-fluid">
                <Link to={`/`} className="float-start text-decoration-none">
                    <div className="navbar-brand fs-3 fw-bold">Shop Go</div>
                </Link>
                <SearchProducts></SearchProducts>
                <div className=''>
                    <Link to={`/cart`}>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={ cartEmpty ? 0 : cart.length } color="primary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </Link>
                </div>
                <div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {loggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <div className="nav-link active">
                                            {user ? (
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        className='fw-bold'
                                                        style={{ cursor: "pointer" }}
                                                        as="div"
                                                        variant="success"
                                                        id="dropdown-basic">
                                                        {user.username}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item as={Link} to={{ pathname: `/${user.id}`, state: {user}}}>
                                                                <AccountCircleIcon color='warning'/>  Profile
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">
                                                            <SettingsIcon color='warning'/>  Settings
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => handleLogout()}>
                                                            <LogoutIcon color='warning'/>  Logout
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            ):(
                                                <div>
                                                    <span>Loading User...</span>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className='nav-link active fw-bold'
                                            to={ `/register` }>
                                                <button className='btn btn-dark fw-bold'>Register</button>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className='nav-link active fw-bold'
                                            to={ `/login` }>
                                                <button className='btn btn-dark fw-bold'>Login</button>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
