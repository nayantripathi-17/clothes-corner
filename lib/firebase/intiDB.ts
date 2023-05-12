import { init } from "./init";
import { getFirestore } from "firebase/firestore";

export const initDB = async () => {
    const app = await init()
    const db = getFirestore(app)

    return db;
}
