import { shopifyInit } from "./shopifyInit";

export const storeFrontInit = async () => {

    const { shopify, session } = await shopifyInit()

    const storefrontClient = new shopify.clients.Storefront({
        domain: String(process.env.NEXT_PUBLIC_SHOP),
        storefrontAccessToken: String(process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN)
    })

    return storefrontClient;
}