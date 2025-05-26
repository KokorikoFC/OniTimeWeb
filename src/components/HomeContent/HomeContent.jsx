import React from "react";
import greenWave from "../../assets/images/green_wave.svg";
import whiteWave from "../../assets/images/white_wave.svg";
import brownWave from "../../assets/images/brown_wave.svg";

import "./HomeContent.css";

function HomeContent({ id, bgColor, subtitle, title, text,image, isLast }) {
    const waveSrc = isLast
        ? brownWave
        : bgColor === "var(--light_green)"
        ? whiteWave
        : greenWave;

    const dynamicClass = `home-content-container home-content-${id}`;

    return (
        <div
            className={dynamicClass}
            style={{
                backgroundColor: bgColor,
                color: bgColor === "white" ? "#000" : "#fff",
            }}
        >
            <div className="home_content_text">
                <h3>{subtitle}</h3>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <div className="home_content_img">
                 {image && <img src={image} alt={`${title} illustration`} className="section-image" />}
            </div>

            <img
                className="home_content_wave"
                src={waveSrc}
                alt="Decorative wave"
            />
        </div>
    );
}

export default HomeContent;
