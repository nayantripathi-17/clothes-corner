import { Button, NumberInput, Text, TextInput } from "@mantine/core"
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
      if (captcha === null || phone === "" || phone.toString().length != 10) return;

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
      if (otp === "" || otp.toString().length !== 6 || confirmationResult === null) return;

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
    <div className="px-10 py-5 text-black space-y-4">
      <p className="text-4xl text-gray-500 font-bold">Login</p>

      <TextInput
        className="items-center"
        label="Phone Number"
        required
        name="phone"
        type="tel"
        pattern="[0-9]{10}"
        value={phone}
        icon={
          <p className="">+91</p>
        }
        onChange={(e) => setPhone(e.currentTarget.value)}
        error={(phone !== "" && phone.length !== 10) ? "Phone number should be 10 digits" : false}
      />
      <Button id="get-otp" className="bg-blue-400 hover:bg-blue-600" onClick={() => getOtp()}>Get OTP</Button>

      {showOtpBox &&
        <>
          <NumberInput
            label="Otp"
            hideControls
            required
            name="otp"
            value={otp}
            onChange={setOtp}
            error={(otp !== "" && otp.toString().length !== 6) ? "Enter 6 digit OTP" : (isIncorrectOtp ? "Incorrect OTP" : false)}
          />
          <Button className="bg-blue-400 hover:bg-blue-600" onClick={() => verifyOtp()}>Submit OTP</Button>
        </>
      }

    </div>
  )
}

export default LoginForm