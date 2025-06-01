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
import { motion } from "framer-motion";
import happy_face from "../../assets/images/emotionface_happy.png";
import neutral_face from "../../assets/images/emotionface_neutral.png";
import sad_face from "../../assets/images/emotionface_sad.png";
import very_happy_face from "../../assets/images/emotionface_veryhappy.png";
import very_sad_face from "../../assets/images/emotionface_verysad.png";

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate("/"); // Redirige a Home si no hay usuario
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

        return () => unsubscribe(); // limpiar listener al desmontar
    }, [navigate]);

    if (loading) return;

    return (
        <motion.div
            className="wrapped-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div
                className="wrapped-first-cont"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    className="wrapped-title-container"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h3>Wrapped</h3>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {userData.userName}, ESTE AÑO {userData.yearRef} HAN
                        SUCEDIDO MUCHAS COSAS EN ONITIME
                    </motion.h1>
                </motion.div>
                <motion.div
                    className="activeDays-container"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div
                        className="activeDays-innerCont"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <p>{userData.totalActiveDays} Días</p>
                    </motion.div>
                </motion.div>
            </motion.div>

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
                <motion.div
                    className="wrapped-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <hr />
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        TU DIARIO EMOCIONAL HABLA POR TI. MIRA TODO LO QUE HA
                        CONTADO ESTE AÑO
                    </motion.h2>
                    <hr />
                </motion.div>
                <motion.div
                    className="emotions-container"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        staggerChildren: 0.1,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <ul>
                        {Object.entries(moodCounts).map(([mood, count]) => (
                            <motion.li
                                key={mood}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeOut",
                                }}
                                viewport={{ once: true, amount: 0.1 }}
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
                                    <p className="emotion-days">{count} días</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>

                    <motion.div
                        className="entries-container"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <p className="diary-counter">
                            ¡Has escrito en tu diario {userData.diaryEntryYear}{" "}
                            días del año!
                        </p>{" "}
                    </motion.div>
                </motion.div>
                <motion.div
                    className="wrapped-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <hr />
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        CONVERSACIONES QUE DEJARON HUELLA
                    </motion.h2>
                    <hr />
                </motion.div>
                <motion.div
                    className="chat-container"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div
                        className="chatText"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <p>Mensajes con Oni: {userData.messagesOniYear}</p>{" "}
                    </motion.div>
                </motion.div>
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
                    <motion.div
                        className="wrapped-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <hr />
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            TUS LOGROS BRILLAN COMO MONEDAS DE ORO
                        </motion.h2>
                        <hr />
                    </motion.div>
                    <motion.div
                        className="coins-container"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.div
                            className="coinText"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <p>
                                Has obtenido un total de:
                                <strong> {userData.coinsYear}</strong>
                            </p>
                            <img src={coin} alt="" />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="wrapped-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <hr />
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            VOLVER UNA Y OTRA VEZ TAMBIÉN ES AVANZAR
                        </motion.h2>
                        <hr />
                    </motion.div>
                    <motion.div
                        className="streak-container"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.div
                            className="coinText"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <p>
                                Tu racha más larga ha sido de:
                                <strong> {longestStreak} días</strong>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default Wrapped;
