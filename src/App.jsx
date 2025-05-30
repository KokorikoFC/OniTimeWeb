import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Wrapped from "./pages/Wrapped/Wrapped.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ChatBot from "./pages/Chatbot.jsx";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wrapped" element={<Wrapped />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
