import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        profile_image: null,
        email: '',
        phone_no: '',
        address: ''
    });

    // Set the authorization token for Axios
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    // Fetch profile data
    const profileData = async () => {
        try {
            const response = await axios.get(`/api/user`);
            setProfile(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Initialize form data when profile is fetched
    useEffect(() => {
        if (profile && Object.keys(profile).length > 0) {
            setFormData({
                name: profile.name || '',
                username: profile.username || '',
                profile_image: profile.profile_image || null,
                email: profile.email || '',
                phone_no: profile.phone_no || '',
                address: profile.address || ''
            });
        }
    }, [profile]);

    // Fetch profile data on component mount
    useEffect(() => {
        profileData();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profile_image') {
            setFormData(prevState => ({
                ...prevState,
                profile_image: files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve token
        const data = new FormData();

        // Append only non-empty fields to FormData
        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        // Log FormData to verify its contents
        for (let [key, value] of data.entries()) {
            if (value instanceof File) {
                console.log(key, URL.createObjectURL(value));
            } else {
                console.log(key, value);
            }
        }

        try {
            const response = await axios.put(`/api/update/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Profile updated successfully:", response.data);
            setProfile(response.data.user); // Update the profile state
            alert("Profile updated successfully!");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Handle validation errors
                console.log(error.response.data.message, error.response.data.errors);
                setValidationErrors(error.response.data.errors);
            } else {
                console.error("Error updating profile:", error);
                alert("Error updating profile. Please try again.");
            }
        }
    };

    return (
        <div className="row" style={{ marginTop: '4rem' }}>
            <div className="col-md-8">
                <Card className='mt-3'>
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <Card.Subtitle className="mb-3 mt-3 text-muted">Edit</Card.Subtitle>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Image
                                        src={formData.profile_image instanceof File ? URL.createObjectURL(formData.profile_image) : profile.profile_image}
                                        roundedCircle
                                        className='custom-image-size my-3'
                                    />
                                </Col>
                                <Col className='align-self-center' xs={6} md={4}>
                                    <input
                                        type="file"
                                        onChange={handleChange}
                                        className='form-control'
                                        name="profile_image"
                                        id="profile_image"
                                    />
                                </Col>
                            </Row>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`form-control bg-white ${validationErrors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    placeholder="name"
                                    autoComplete="name"
                                />
                                {validationErrors.name && (
                                    <div className="text-danger">{validationErrors.name[0]}</div>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`form-control bg-white ${validationErrors.username ? 'is-invalid' : ''}`}
                                    id="username"
                                    placeholder="username"
                                    autoComplete="username"
                                />
                                {validationErrors.username && (
                                    <div className="text-danger">{validationErrors.username[0]}</div>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    className={`form-control bg-white ${validationErrors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    placeholder="email"
                                    autoComplete="email"
                                />
                                {validationErrors.email && (
                                    <div className="text-danger">{validationErrors.email[0]}</div>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="phone_no"
                                    value={formData.phone_no || ''}
                                    onChange={handleChange}
                                    className={`form-control bg-white ${validationErrors.phone_no ? 'is-invalid' : ''}`}
                                    id="phone_no"
                                    placeholder="phone_no"
                                    autoComplete="phone_no"
                                />
                                {validationErrors.phone_no && (
                                    <div className="text-danger">{validationErrors.phone_no[0]}</div>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                    className={`form-control bg-white ${validationErrors.address ? 'is-invalid' : ''}`}
                                    id="address"
                                    placeholder="address"
                                    autoComplete="address"
                                />
                                {validationErrors.address && (
                                    <div className="text-danger">{validationErrors.address[0]}</div>
                                )}
                            </div>
                            <Button type='submit' variant="warning">Update</Button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-8"></div>
        </div>
    );
};

export default Profile;
