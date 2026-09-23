import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../services/auth";
function ProtectedAdminRoute() { return auth.getToken() ? <Outlet /> : <Navigate to="/admin/login" replace />; }
export default ProtectedAdminRoute;
