import React, { useState, useEffect, useRef } from "react";
import greenWave from "../../assets/images/green_wave.svg";
import whiteWave from "../../assets/images/white_wave.svg";
import brownWave from "../../assets/images/brown_wave.svg";
import simple_home from "../../assets/images/simple_home.png";
import cozy_home from "../../assets/images/cozy_home.png";
import botanic_home from "../../assets/images/botanic_home.png";
import sushi_home from "../../assets/images/sushi_home.png";
import christmast_home from "../../assets/images/christmast_home.png";

import "./HomeContent.css";

function HomeContent({ id, bgColor, subtitle, title, text, image, isLast }) {
    const waveSrc = isLast
        ? brownWave
        : bgColor === "var(--light_green)"
        ? whiteWave
        : greenWave;

    const dynamicClass = `home-content-container home-content-${id}`;

    const originalHomeImages = [
        simple_home,
        cozy_home,
        botanic_home,
        sushi_home,
        christmast_home,
    ];

    // Duplicamos las imágenes para crear el efecto continuo
    const allHomeImages = [...originalHomeImages, ...originalHomeImages];

    const sliderRef = useRef(null);
    const animationFrameRef = useRef(null);
    const scrollSpeed = 0.5;

    useEffect(() => {
        if (id === 5 && sliderRef.current) {
            const slider = sliderRef.current;
            let currentScroll = 0;

            const animate = () => {
                currentScroll += scrollSpeed;
                slider.scrollLeft = currentScroll;

                if (
                    currentScroll >=
                    originalHomeImages.length * getImageWidth()
                ) {
                    currentScroll = 0;
                    slider.scrollLeft = 0;
                }

                animationFrameRef.current = requestAnimationFrame(animate);
            };

            const getImageWidth = () => {
                const firstImage = slider.querySelector(".home_style_image");
                return firstImage ? firstImage.offsetWidth + 10 : 0; // + margin-right
            };

            const waitForImages = () => {
                const width = getImageWidth();
                if (width > 0) {
                    animate();
                } else {
                    setTimeout(waitForImages, 100); // Intenta de nuevo en 100ms
                }
            };

            waitForImages();

            return () => cancelAnimationFrame(animationFrameRef.current);
        }
    }, [id, originalHomeImages.length]);

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
                {id === 8 && (
                   <div className="download-button">
                    <img
                            src="src/assets/images/button_placeholder.png"
                            alt="form button"
                        />
                   </div>
                )}
                <p>{text}</p>
            </div>
            <div className="home_content_img">
                {image && (
                    <img
                        src={image}
                        alt={`${title} illustration`}
                        className="section-image"
                    />
                )}
            </div>

            {id === 5 && (
                <div className="home_content_slider" ref={sliderRef}>
                    {allHomeImages.map((imgSrc, idx) => (
                        <img
                            key={idx}
                            src={imgSrc}
                            alt={`Home style ${
                                (idx % originalHomeImages.length) + 1
                            }`}
                            className="home_style_image"
                        />
                    ))}
                </div>
            )}

            {id === 7 && (
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
            )}

            <img
                className="home_content_wave"
                src={waveSrc}
                alt="Decorative wave"
            />
        </div>
    );
}

export default HomeContent;
