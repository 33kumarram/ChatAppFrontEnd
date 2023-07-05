import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./Components/LogIn/LoginPage";
import { HomePage } from "./Components/home/HomePage";
import { Header } from "./Components/header/header";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import About from "./Components/about/about";
import Contact from "./Components/contact/contact";
import background from "./animations/background.jpg";

const PrivateRoute = ({ token, ...props }) => {
  return token ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100vw",
        height: "140vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LoginPage} exact />
          <Route path="/home" element={<PrivateRoute token={user?.token} />}>
            <Route path="/home" Component={HomePage} />
          </Route>
          <Route path="/about" element={<PrivateRoute token={user?.token} />}>
            <Route path="/about" Component={About} />
          </Route>
          <Route path="/contact" element={<PrivateRoute token={user?.token} />}>
            <Route path="/contact" Component={Contact} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
