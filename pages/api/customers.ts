import { NextApiRequest, NextApiResponse } from "next";
import { shopifyInit } from "../../lib/shopify/shopifyInit";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  return res.status(418).json({ message: "I'm a teapot that's under development" })

}