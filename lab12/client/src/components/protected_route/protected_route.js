import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Якщо користувач не авторизований, перенаправляємо на логін
  }

  return children; // Якщо авторизований, відображаємо дочірні компоненти
};

export default ProtectedRoute;

