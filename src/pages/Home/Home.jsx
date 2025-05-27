import { useState } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import "./Home.css";
import whiteWave from "../../assets/images/white_wave.svg";
import HomeContent from "../../components/HomeContent/HomeContent.jsx";

import sectionsData from "../../mocks/sectionsData.json";
import taskScreen from "../../assets/images/task_screen.png"; // Import real

const sectionsDataWithImages = sectionsData.map((section) => {
    if (section.id === 1) {
        return { ...section, image: taskScreen };
    }
    return section;
});
function Home() {
    return (
        <div className="home-container">
            <div className="hero">
                <img
                    className="hero_wave"
                    src={whiteWave}
                    alt="Decorative wave"
                />
            </div>
            <div className="form">
                <div className="email-form-container">
                    <label htmlFor="">Introduce tu correo*</label>
                    <input type="text" required />
                </div>
                <div className="password-form-container">
                    <label htmlFor="">Introduce tu contraseña*</label>
                    <input type="text" required />
                </div>
                <div className="form-buttons">
                    <img
                        src="src/assets/images/button_placeholder.png"
                        alt="form button"
                    />
                </div>
            </div>
            <div>
                {sectionsDataWithImages.map(
                    ({ id, bgColor, subtitle, title, text, image }, index) => (
                        <HomeContent
                            key={id}
                            id={id}
                            bgColor={bgColor}
                            subtitle={subtitle}
                            title={title}
                            text={text}
                            image={image}
                            isLast={index === sectionsDataWithImages.length - 1}
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default Home;
