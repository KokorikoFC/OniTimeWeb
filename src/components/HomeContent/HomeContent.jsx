import React, { useState, useEffect, useRef } from "react";
import greenWave from "../../assets/images/green_wave.svg";
import whiteWave from "../../assets/images/white_wave.svg";
import brownWave from "../../assets/images/brown_wave.svg";
import simple_home from "../../assets/images/simple_home.png";
import cozy_home from "../../assets/images/cozy_home.png";
import botanic_home from "../../assets/images/botanic_home.png";
import sushi_home from "../../assets/images/sushi_home.png";
import christmast_home from "../../assets/images/christmast_home.png";
import { useNavigate } from "react-router-dom"; // si usas react-router
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // ajusta la ruta según tu estructura
import { motion } from "framer-motion";
import FAQ from "../FQA.jsx/FQA";
import FadeInSection from "../../components/FadeInSection";

import "./HomeContent.css";

function HomeContent({ id, bgColor, subtitle, title, text, image, isLast }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loginError, setLoginError] = useState("");

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log("Usuario autenticado:", user.uid);
            setLoginError(""); // limpia errores anteriores
            navigate("/wrapped");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setLoginError("Correo o contraseña incorrectos");
        }
    };

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
                return firstImage ? firstImage.offsetWidth + 10 : 0;
            };

            const waitForImages = () => {
                const width = getImageWidth();
                if (width > 0) {
                    animate();
                } else {
                    setTimeout(waitForImages, 100);
                }
            };

            waitForImages();

            return () => cancelAnimationFrame(animationFrameRef.current);
        }
    }, [id, originalHomeImages.length]);

    return (
        <div
            id={`home-content-${id}`}
            className={dynamicClass}
            style={{
                backgroundColor: bgColor,
                color: bgColor === "white" ? "#000" : "#fff",
            }}
        >
            <motion.div
                className="home_content_text"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <h3>{subtitle}</h3>
                <h2>{title}</h2>

                {id === 9 && (
                    <div className="download-button">
                        <a
                            href="https://firebasestorage.googleapis.com/v0/b/tfgonitime.firebasestorage.app/o/OniTime.apk?alt=media&token=54ce815f-4e6f-49b5-8ba6-6a065ab6b9cd"
                            download="OniTime.apk"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="/assets/images/download_btn.png"
                                alt="form button"
                            />
                        </a>
                    </div>
                )}

                {id === 8 && <FAQ />}

                <p>{text}</p>
            </motion.div>

            <motion.div
                className="home_content_img"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {image && (
                    <motion.img
                        src={image}
                        alt={`${title} illustration`}
                        className="section-image"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    />
                )}
            </motion.div>

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
                <motion.div
                    className="form"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="email-form-container">
                        <label>Introduce tu correo*</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password-form-container">
                        <label>Introduce tu contraseña*</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <img
                            src="/assets/images/discover_btn.png"
                            alt="form button"
                            onClick={handleLogin}
                            style={{ cursor: "pointer" }}
                        />
                        {loginError && (
                            <p>
                                {loginError}
                            </p>
                        )}
                    </div>
                </motion.div>
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
