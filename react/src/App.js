import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";
import './App.css';
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import ChangePassword from "./Components/Changepass";
import Cart from "./Components/Cart";
import Order from "./Components/Order";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route index
            element={<Login />}>
          </Route>

          <Route path="/register" element={<Register />}>

          </Route>
          <Route path="/forget" element={<ForgotPasswordForm />}></Route>

        </Route>

        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />

        </Route>
        <Route path="/cart" element={<Cart />} />

        <Route path="/order" element={<Order />} />


        <Route path="/changepassword" element={<ChangePassword />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;