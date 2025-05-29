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

    // 💡 Función para hacer scroll suave a un id
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offsetTop = element.offsetTop - 110; // Calcula la posición deseada (100px más arriba)
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    };

    return (
        <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
            <div className="header_oniTime_logo_container">
                <a className="nav-button"
                    onClick={() => scrollToSection("home-hero")}>
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
                {/*scroll al id "home-content-7" */}
                <a
                    className="nav-button"
                    onClick={() => scrollToSection("home-hero")}
                >
                    Home
                </a>

                {/*scroll al id "home-content-7" */}
                <a
                    className="nav-button"
                    onClick={() => scrollToSection("home-content-7")}
                >
                    Wrapped
                </a>

                {/*scroll al id "home-content-8" */}
                <a
                    className="nav-button"
                    onClick={() => scrollToSection("home-content-8")}
                >
                    FAQ
                </a>

                {/*scroll al id "home-content-9" */}
                <a
                    className="nav-button"
                    onClick={() => scrollToSection("home-content-9")}
                >
                    Descargar
                </a>
            </nav>
        </header>
    );
}

export default Header;
