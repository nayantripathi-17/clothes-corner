import { Button, Card, NumberInput, Text, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initAuth } from "../lib/firebase/initAuth";
import { signIn } from "next-auth/react";

function LoginForm() {

  const [phone, setPhone] = useState<string | "">("")
  const [otp, setOtp] = useState<number | "">("")
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [captcha, setCaptcha] = useState<null | RecaptchaVerifier>(null)
  const [confirmationResult, setConfirmationResult] = useState<null | ConfirmationResult>(null)
  const [isIncorrectOtp, setIsIncorrectOtp] = useState(false)

  const getOtp = async () => {
    try {
      if (captcha === null || phone === "" || phone.toString().length != 10 || Number.isNaN(Number(phone))) return;

      const phoneNo = `+91${phone}`
      const auth = await initAuth();
      const res = await signInWithPhoneNumber(auth, phoneNo, captcha)
      setShowOtpBox(true)
      setConfirmationResult(res)

    } catch (err) {
      console.log(err)
    }

  }

  const verifyOtp = async () => {
    try {
      if (otp === "" || otp.toString().length !== 6 || Number.isNaN(Number(otp)) || confirmationResult === null) return;

      setIsIncorrectOtp(false)
      const res = await confirmationResult.confirm(otp.toString())

      signIn("credentials", { phone: `+91${phone.toString()}` })

    } catch (err) {
      setIsIncorrectOtp(true)
      console.log(err)
    }
  }



  useEffect(() => {

    const invisibleRecaptchaVerifier = async () => {
      try {
        const auth = await initAuth();

        const recaptchaVerifier = new RecaptchaVerifier('get-otp', {
          "size": "invisible",
        }, auth)

        setCaptcha(recaptchaVerifier)
      } catch (err) {
        console.log(err)
      }
    }
    invisibleRecaptchaVerifier()
  }, [])


  return (
    <Card padding="xl" withBorder shadow="xl" className="text-black space-y-4 text-center min-h-[65vh]">
      <Card.Section></Card.Section>
      <p className="text-2xl text-gray-600 font-bold tracking-wide">Welcome to TheThirteen</p>
      <p className="text-xl text-gray-600">Shop and get 50% off</p>
      <TextInput
        className="items-center"
        required
        name="phone"
        type="tel"
        placeholder="Enter Phone Number"
        pattern="[0-9]{10}"
        value={phone}
        icon={
          <p className="text-gray-500 px-2">+91</p>
        }
        onChange={(e) => setPhone(e.currentTarget.value)}
        error={(phone === "" || phone.length !== 10 || Number.isNaN(Number(phone))) ? "Phone number should be 10 digits" : false}
      />
      <Button id="get-otp" className="w-full text-black uppercase py-2 border-black rounded-none border-2 font-semibold tracking-wider hover:bg-gray-100 cursor-pointer" onClick={() => getOtp()}>Get OTP</Button>

      {showOtpBox &&
        <>
          <NumberInput
            hideControls
            placeholder="Enter OTP"
            classNames={{
              wrapper:"py-4"
            }}
            required
            name="otp"
            value={otp}
            onChange={setOtp}
            error={(otp === "" || otp.toString().length !== 6 || Number.isNaN(Number(otp))) ? "Enter 6 digit OTP" : (isIncorrectOtp ? "Incorrect OTP" : false)}
          />
          <Button className="w-full text-black uppercase py-2 border-black rounded-none border-2 font-semibold tracking-wider hover:bg-gray-100 cursor-pointer" onClick={() => verifyOtp()}>Submit OTP</Button>
        </>
      }

    </Card>
  )
}

export default LoginForm