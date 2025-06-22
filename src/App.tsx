import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { useAuth } from "./context/AuthContext";
import DefaultLayout from "./layouts/default";
import Hero from "./components/dashboard/Hero";
import LogoutPage from "./pages/logout";



const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth()
  return token ? <>{children}</> : <Navigate to="/login" />
};


const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <Hero />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}


export default App;
