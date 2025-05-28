import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData, getMoodCountsByYear, getLongestStreak } from "../../firestoreService";
import { useNavigate } from "react-router-dom";


function Wrapper() {
    const [userData, setUserData] = useState(null);
    const [moodCounts, setMoodCounts] = useState(null);
    const [longestStreak, setLongestStreak] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const moodLabels = {
        masomenos: "Mas o menos",
        fantastico: "Fantástico",
        deprimido: "Deprimido",
        feliz: "Feliz",
        triste: "Triste",
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

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="wrapped-container">
            <h1>Resumen del año de {userData.userName}</h1>
            <p>Año analizado: {userData.yearRef}</p>
            <p>Coins: {userData.coinsYear}</p>
            <p>Entradas en el diario: {userData.diaryEntryYear}</p>
            <p>Mensajes con Oni: {userData.messagesOniYear}</p>
            <p>Días activos: {userData.totalActiveDays}</p>
            <p><strong>Racha más larga:</strong> {longestStreak} días</p>

            <h2>Estado de ánimo en {userData.yearRef}</h2>
            <ul>
                {Object.entries(moodCounts).map(([mood, count]) => (
                    <li key={mood}>
                        {moodLabels[mood] || mood}: {count}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Wrapper;
