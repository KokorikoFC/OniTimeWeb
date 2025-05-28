import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import favicon from "../../assets/logos/oniTime_favicon.png";
import logo from "../../assets/logos/oniTime_logo.png";
import "./Header.css";

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
            <div className="header_oniTime_logo_container">
                <a href="/">
                    <img
                        className="header_oniTime_icon"
                        src={favicon}
                        alt="oniTime icon"
                    />
                    <img
                        className="header_oniTime_logo"
                        src={logo}
                        alt="oniTime logo"
                    />
                </a>
            </div>
            <nav className="header_nav">
                <Link to="/">Home</Link>
                <Link to="/wrapper">Wrapped</Link>
                <Link to="/">FAQ</Link>
                <Link to="/">Descargar</Link>
            </nav>
        </header>
    );
}

export default Header;
