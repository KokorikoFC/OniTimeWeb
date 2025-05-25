import { useState } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import "./Home.css";
import whiteWave from "../../assets/images/white_wave.svg";
import greenWave from "../../assets/images/green_wave.svg";

function Home() {
    return (
        <div className="home-container">
            <div className="hero">
                 <img className="hero_wave" src={whiteWave} alt="Decorative wave" />
            </div>
            <div className="home-content-container">
                 <img className="home_content_wave" src={greenWave} alt="Decorative wave" />

            </div>
        </div>
    );
}

export default Home;
