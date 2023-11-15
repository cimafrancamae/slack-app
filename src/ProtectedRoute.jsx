import { Route, Navigate } from "react-router-dom";

function ProtectedRoute ({ children }) {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    
    return isAuthenticated ? children : <Navigate to={'/'} />; 
}

export default ProtectedRoute;