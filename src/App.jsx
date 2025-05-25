import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Wrapper from "./pages/Wrapper/Wrapper.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wrapper" element={<Wrapper />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
