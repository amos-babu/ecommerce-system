import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuth } from '../AuthContext';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const Login = () => {
    const { login, logout } = useAuth();
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('/api/login', formData)
        .then((res) => {
            const token = res.data.access_token;
            localStorage.setItem('token', token);
            console.log(res);
            logout();
            navigate('/');

        })
        .catch((err) => {
            if(err.response && err.response.status === 422) {
                console.log(err.response.data.message, err.response.data.errors);
                setError(err.response.data.errors)
            }
            console.log("Password does not match", err);
        })
    };
  return (
    <div className="container">
        <Navbar/>
        <div className="row justify-content-center" style={{ marginTop: '74px' }}>
            <div className='col-md-6 align-self-center'>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className='mb-3'>Login</h5>
                            <form onSubmit={ handleSubmit }>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                name="email"
                                                value={ formData.email }
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className={`form-control bg-white ${error.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                placeholder="email"
                                                autoComplete="email"
                                                />
                                            <label
                                                htmlFor="floatingInput"
                                            >
                                                Email
                                            </label>
                                            {error.email && (
                                                <div className="text-danger">{error.email[0]}</div>
                                            )}
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                name="password"
                                                value={ formData.password }
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                className={`form-control bg-white ${error.password ? 'is-invalid' : ''}`}
                                                id="password"
                                                placeholder="password"
                                                autoComplete="password"
                                                />
                                            <label
                                                htmlFor="floatingInput"
                                            >
                                                Password
                                            </label>
                                            {error.password && (
                                                <div className="text-danger">{error.password[0]}</div>
                                            )}
                                        </div>

                                <br />
                                <div>
                                        <h6>
                                            <Link
                                                className='text-decoration-none'
                                                to={ ``}>Forgot Password ?
                                            </Link>
                                        </h6>

                                    </div>
                                    <div>
                                        <h6>Don't have an account ?
                                            <span className='ms-2'>
                                                 <Link
                                                    className='text-decoration-none'
                                                    to={ `/register`}>Create Account</Link>
                                            </span>
                                        </h6>

                                    </div>
                                <br />
                                <button
                                    type='submit'
                                    className='btn btn-outline-primary'
                                    >
                                        Login
                                </button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Login;
