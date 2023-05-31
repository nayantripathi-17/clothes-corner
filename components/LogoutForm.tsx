import { Button, Card } from "@mantine/core"
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
        <Card padding="xl" withBorder shadow="xl" className="text-black space-y-4 text-center">
            <div>
                {/*@ts-ignore*/}
                {/* <p>{session?.user?.phone}</p> */}
                <Button className="w-full text-red-600 uppercase py-2 border-red-600 rounded-none border-2 font-semibold tracking-wider hover:bg-red-100 cursor-pointer" onClick={() => logOut()}>Logout</Button>
            </div>
        </Card>
    )
}

export default LogoutForm