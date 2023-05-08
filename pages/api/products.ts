import { NextApiRequest, NextApiResponse } from "next";
import { shopifyInit } from "../../lib/shopify/shopifyInit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { shopify, session } = await shopifyInit();
    const products = await shopify?.rest.Product.all({ session });

    res.status(200).json({ products: products.data })
}