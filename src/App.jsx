import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Wrapped from "./pages/Wrapped/Wrapped.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const hideLayoutOnRoutes = ["/wrapped"];
  const shouldShowLayout = !hideLayoutOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wrapped" element={<Wrapped />} />
      </Routes>
      {shouldShowLayout && <Footer />}
    </>
  );
}

export default App;