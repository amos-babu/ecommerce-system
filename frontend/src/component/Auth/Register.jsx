import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const Register = () => {
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('/api/register', formData)
        .then((res) => {
            const token = res.data.access_token;
            localStorage.setItem('token', token);
            console.log(res);
            navigate('/');
        })
        .catch((err) => {
            if(err.response && err.response.status === 422) {
                console.log(err.response.data.message, err.response.data.errors);
                setError(err.response.data.errors);
            }
            console.log(err);
        })
    };
  return (
    <div className="container">
        <Navbar/>
        <div className="row justify-content-center" style={{ marginTop: '74px' }}>
            <div className='col-md-6 align-self-center'>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className='mb-3'>Register</h5>
                            <form onSubmit={ handleSubmit }>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        value={ formData.name }
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={`form-control bg-white ${error.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        placeholder="name"
                                        autoComplete="name"
                                        />
                                    <label
                                        htmlFor="floatingInput"
                                    >
                                        Name
                                    </label>
                                    {error.name && (
                                        <div className="text-danger">{error.name[0]}</div>
                                     )}
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="username"
                                        value={ formData.username }
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        className={`form-control bg-white ${error.username ? 'is-invalid' : ''}`}
                                        id="username"
                                        placeholder="username"
                                        autoComplete="username"
                                        />
                                    <label
                                        htmlFor="floatingInput"
                                    >
                                        Username
                                    </label>
                                    {error.username && (
                                        <div className="text-danger">{error.username[0]}</div>
                                     )}
                                </div>
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
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={ formData.password_confirmation }
                                        onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                                        className={`form-control bg-white ${error.password ? 'is-invalid' : ''}`}
                                        id="password_confirmation"
                                        placeholder="password_confirmation"
                                        autoComplete="password_confirmation"
                                        />
                                    <label
                                        htmlFor="floatingInput"
                                    >
                                        Confirm Password
                                    </label>
                                    {error.password && (
                                        <div className="text-danger">{error.password[0]}</div>
                                     )}
                                </div>
                                <br />
                                <div>
                                        <h6>Have an account ?
                                            <span className='ms-2'>
                                                 <Link
                                                    className='text-decoration-none'
                                                    to={ `/login`}>Sign In</Link>
                                            </span>
                                        </h6>

                                    </div>
                                <br />
                                <button
                                    type='submit'
                                    className='btn btn-outline-primary'
                                    >
                                        Register
                                </button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Register;
