import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    return res.status(418).json({ message: "I'm a teapot that's under development" })

  } catch (err) {
    //@ts-ignore
    console.log(err?.response)
    return res.status(500).json({ message: "Internal Server Error" })
  }

}