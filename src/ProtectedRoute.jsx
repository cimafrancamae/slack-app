import { Route, Navigate } from "react-router-dom";

function ProtectedRoute ({ children }) {
    const isAuthenticated = !!localStorage.getItem('access-token');
    
    return isAuthenticated ? children : <Navigate to={'/'} />; 
}

export default ProtectedRoute;