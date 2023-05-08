import { Button } from "@mantine/core"
import { signOut, useSession } from "next-auth/react"
import { initAuth } from "../lib/firebase/initAuth";

function LogoutForm() {
    const { data: session, status } = useSession()

    const logOut = async () => {
        try {
            const auth = await initAuth();
            await signOut()
            await auth.signOut()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="text-black flex justify-center flex-grow">
            <div>
            {/*@ts-ignore*/}
                <p>{session?.user?.phone}</p>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => logOut()}>Logout</Button>
            </div>
        </div>
    )
}

export default LogoutForm