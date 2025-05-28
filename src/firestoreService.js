import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getUserData = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        throw new Error("Usuario no encontrado");
    }

    return userSnap.data();
};

export const getMoodCountsByYear = async (userId, yearRef) => {
    const moodsRef = collection(db, "users", userId, "moods");
    const moodSnaps = await getDocs(moodsRef);

    const moodCounts = {
        masomenos: 0,
        fantastico: 0,
        deprimido: 0,
        feliz: 0,
        triste: 0,
    };

    moodSnaps.forEach((docSnap) => {
        const moodData = docSnap.data();
        const docId = docSnap.id;
        console.log("Mood docId:", docId, "Data:", moodData);

        const moodYear = docId.split("-")[0];
        yearRef = String(yearRef);
        if (moodYear === yearRef && moodData.moodType) {
            const type = moodData.moodType.toLowerCase();
            if (moodCounts.hasOwnProperty(type)) {
                moodCounts[type]++;
            }
        }
    });

    console.log("Mood counts:", moodCounts);
    return moodCounts;
};

export const getLongestStreak = async (userId) => {
    try {
        const streakDocRef = doc(db, "users", userId, "streak", "dailyStreak");
        const streakSnap = await getDoc(streakDocRef);

        if (streakSnap.exists()) {
            const data = streakSnap.data();
            return data.longestStreak ?? 0;
        } else {
            console.warn("No streak data found for user:", userId);
            return 0;
        }
    } catch (error) {
        console.error("Error fetching streak data:", error);
        return 0;
    }
};

