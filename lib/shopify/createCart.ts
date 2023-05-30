import { doc, setDoc } from "firebase/firestore"
import { createCartWithoutLines } from "../gql/mutateCartQuery"
import { initDB } from "../firebase/intiDB"

export const createCart = async (phone: string) => {
    const db = await initDB()
    const cartRes = await createCartWithoutLines(String(phone))

    const customerCartData = {
        cartDetails: {
            // @ts-ignore
            cartId: cartRes?.body?.data?.cartCreate?.cart?.id
        }
    }

    const customerCartRef = doc(db, "cart", `${phone}`)

    await setDoc(customerCartRef, customerCartData, { merge: false })
}