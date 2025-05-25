import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";
import favicon from '../../assets/logos/oniTime_favicon.png';
import logo from '../../assets/logos/oniTime_logo.png';

import "./Header.css";

function Header() {
  return (
    <header>
      <div className="header_oniTime_logo_container">
        <img className="header_oniTime_icon" src={favicon} alt="oniTime icon" />
        <img className="header_oniTime_logo" src={logo} alt="oniTime logo" />
      </div>
      <nav className="header_nav">
        <Link to="/">Home</Link>
        <Link to="/wrapper">Wrapper</Link>
        <Link to="/">FAQ</Link>
        <Link to="/">Descargar</Link>
      </nav>
    </header>
  );
}

export default Header;
