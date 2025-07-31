import { Outlet, Navigate } from 'react-router-dom';

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};

const PrivateRoutes = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
