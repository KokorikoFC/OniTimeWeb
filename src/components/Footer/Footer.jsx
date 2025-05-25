import React from "react";
import "./Footer.css";
import favicon from "../../assets/logos/oniTime_favicon.png";
import logo from "../../assets/logos/oniTime_logo.png";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import wave from "../../assets/images/wave.svg";



function Footer() {
    return (
        <footer>
            <div className="footer_container">
                <div className="footer_logo_container">
                    <img
                        className="footer_oniTime_icon"
                        src={favicon}
                        alt="oniTime icon"
                    />
                    <img
                        className="footer_oniTime_logo"
                        src={logo}
                        alt="oniTime logo"
                    />
                </div>
                <div className="footer_media_container">
                    <FaGithub className="media_icon"/>
                    <FaXTwitter className="media_icon"/>

                </div>
                <p>© Creado por KokorikoDevelopersClub.</p>
            </div>
        </footer>
    );
}

export default Footer;
