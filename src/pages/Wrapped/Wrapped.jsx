import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
    getUserData,
    getMoodCountsByYear,
    getLongestStreak,
} from "../../firestoreService";
import { useNavigate } from "react-router-dom";
import "./Wrapped.css";
import coin from "../../assets/images/coin.png";
import greenWave from "../../assets/images/green_wave.svg";
import brownWave from "../../assets/images/brown_wave.svg";
import happy_face from "../../assets/images/emotionface_happy.png";
import neutral_face from "../../assets/images/emotionface_neutral.png";
import sad_face from "../../assets/images/emotionface_sad.png";
import very_happy_face from "../../assets/images/emotionface_veryhappy.png";
import very_sad_face from "../../assets/images/emotionface_verysad.png";
import pet_onigiri from "../../assets/images/onigiri_pet.png";
import FadeInSection from "../../components/FadeInSection";
import goBackArrow from "../../assets/images/ui_gobackarrow_brown.png";

function Wrapped() {
    const [userData, setUserData] = useState(null);
    const [moodCounts, setMoodCounts] = useState(null);
    const [longestStreak, setLongestStreak] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const moodLabels = {
        masomenos: "Más o menos",
        fantastico: "Fantástico",
        deprimido: "Deprimido",
        feliz: "Feliz",
        triste: "Triste",
    };
    const moodImages = {
        feliz: happy_face,
        masomenos: neutral_face,
        triste: sad_face,
        fantastico: very_happy_face,
        deprimido: very_sad_face,
    };

    const handleGoToHome = () => {
        navigate("/"); // Navega a la ruta raíz
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate("/");
                return;
            }

            try {
                const data = await getUserData(user.uid);
                setUserData(data);

                const moods = await getMoodCountsByYear(user.uid, data.yearRef);
                setMoodCounts(moods);

                const streak = await getLongestStreak(user.uid);
                setLongestStreak(streak);
            } catch (err) {
                console.error(err);
                setError("Error al cargar datos");
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) return;

    return (
        <div className="wrapped-container">
            <FadeInSection className="goBackArrow">
                <img
                    src={goBackArrow}
                    alt="Volver al inicio"
                    onClick={handleGoToHome}
                    style={{ cursor: "pointer" }}
                />
            </FadeInSection>
            <FadeInSection className="wrapped-first-cont">
                <FadeInSection className="wrapped-title-container">
                    <h3>Wrapped</h3>
                    <h1>
                        {userData?.userName}, ESTE AÑO {userData?.yearRef} HAN
                        SUCEDIDO MUCHAS COSAS EN ONITIME
                    </h1>
                </FadeInSection>
                <FadeInSection className="activeDays-container">
                    <img
                        src={pet_onigiri}
                        alt="decorative onigiri"
                        className="pet_onigiri"
                    />
                    <div className="activeDays-innerCont">
                        <p>{userData?.totalActiveDays} Días</p>
                    </div>
                </FadeInSection>
                <FadeInSection className="motivation-container">
                    <p className="motivation_text">
                        Cada quien decide cómo vivir. Tú elegiste dedicar tiempo
                        para ti, y eso te hace realmente genial. <br />
                        ¡Vamos a celebrarlo con confeti!
                    </p>
                </FadeInSection>
            </FadeInSection>

            <div className="wave-cont">
                <img
                    src={greenWave}
                    alt="decorative wave"
                    className="decorative_wave"
                />
                <img
                    src={greenWave}
                    alt="decorative wave"
                    className="decorative_wave2"
                />
            </div>

            <div className="second-inner-container">
                <FadeInSection className="wrapped-subtitle">
                    <hr />
                    <h2>
                        TU DIARIO EMOCIONAL HABLA POR TI. MIRA TODO LO QUE HA
                        CONTADO ESTE AÑO
                    </h2>
                    <hr />
                </FadeInSection>
                <FadeInSection className="emotions-container">
                    <ul>
                        {Object.entries(moodCounts || {}).map(
                            ([mood, count]) => (
                                <FadeInSection
                                    key={mood}
                                    className="emotion-item"
                                >
                                    {moodImages[mood] && (
                                        <img
                                            src={moodImages[mood]}
                                            alt={mood}
                                            className="emotion-icon"
                                        />
                                    )}
                                    <div className="emotion-text">
                                        <p className="emotion-name">
                                            {moodLabels[mood]}
                                        </p>
                                        <p className="emotion-days">
                                            {count} días
                                        </p>
                                    </div>
                                </FadeInSection>
                            )
                        )}
                    </ul>

                    <FadeInSection className="motivation-container">
                        <p className="motivation_text">
                            Tus pensamientos tomaron forma en{" "}
                            {userData?.diaryEntryYear} días este año. ¡Cada uno
                            cuenta!
                        </p>
                    </FadeInSection>
                </FadeInSection>
                <FadeInSection className="wrapped-subtitle">
                    <hr />
                    <h2>CONVERSACIONES QUE DEJARON HUELLA</h2>
                    <hr />
                </FadeInSection>
                <FadeInSection className="chat-container">
                    <div className="chatText">
                        <p>
                            Mensajes con Oni:{" "}
                            <span>
                                {userData?.messagesOniYear} interacciones
                            </span>
                        </p>{" "}
                    </div>
                </FadeInSection>
                <FadeInSection className="motivation-container">
                    <p className="motivation_text">
                        Abrirte en palabras es un acto de valentía. Gracias por
                        dejar que Oni te acompañe.
                    </p>
                </FadeInSection>
            </div>

            <div className="wrapped-third-cont">
                <div className="wave-cont">
                    <img
                        src={brownWave}
                        alt="decorative wave"
                        className="decorative_wave"
                    />
                    <img
                        src={brownWave}
                        alt="decorative wave"
                        className="decorative_wave2"
                    />
                </div>
                <div className="third-inner-container">
                    <FadeInSection className="wrapped-subtitle">
                        <hr />
                        <h2>TUS LOGROS BRILLAN COMO MONEDAS DE ORO</h2>
                        <hr />
                    </FadeInSection>
                    <FadeInSection className="coins-container">
                        <div className="coinText">
                            <p>
                                Has obtenido un total de:
                                <span> {userData?.coinsYear}</span>
                            </p>
                            <img src={coin} alt="" />
                        </div>
                    </FadeInSection>
                    <FadeInSection className="motivation-container">
                        <p className="motivation_text">
                            Cada logro, por pequeño que parezca, es una señal de
                            avance. ¡Mereces celebrar!
                        </p>
                    </FadeInSection>

                    <FadeInSection className="wrapped-subtitle">
                        <hr />
                        <h2>VOLVER UNA Y OTRA VEZ TAMBIÉN ES AVANZAR</h2>
                        <hr />
                    </FadeInSection>
                    <FadeInSection className="streak-container">
                        <div className="coinText">
                            <p>
                                Tu racha más larga ha sido de:
                                <span> {longestStreak} días</span>
                            </p>
                        </div>
                    </FadeInSection>
                    <FadeInSection className="motivation-container">
                        <p className="motivation_text">
                            No se trata de no caer, sino de seguir volviendo.
                            ¡Eso es fuerza de verdad!
                        </p>
                    </FadeInSection>
                </div>
            </div>
            <div className="confetti-area">
                {Array.from({ length: 30 }).map((_, i) => {
                    const left = Math.random() * 100;
                    const duration = 3 + Math.random() * 2;
                    const delay = Math.random() * 5;
                    const colors = [
                        "#f94144",
                        "#f3722c",
                        "#f9c74f",
                        "#90be6d",
                        "#43aa8b",
                        "#577590",
                    ];
                    const color =
                        colors[Math.floor(Math.random() * colors.length)];
                    const rotation = Math.random() * 360;

                    return (
                        <span
                            key={i}
                            className="confetti"
                            style={{
                                left: `${left}%`,
                                backgroundColor: color,
                                animationDuration: `${duration}s`,
                                animationDelay: `${-delay}s`,
                                transform: `rotate(${rotation}deg)`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Wrapped;
