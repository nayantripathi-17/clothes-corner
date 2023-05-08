import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, Session } from "@shopify/shopify-api"
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04'
import { randomUUID } from 'crypto';

const shopify = shopifyApi({
    apiKey: String(process.env.NEXT_PUBLIC_SHOPIFY_API_KEY),
    apiSecretKey: String(process.env.NEXT_PUBLIC_SHOPIFY_API_SECRET_KEY),
    scopes: String(process.env.NEXT_PUBLIC_SCOPES).split("&"),
    hostName: String(process.env.NEXT_PUBLIC_HOSTNAME),
    hostScheme: 'http',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: false,
    restResources
})

const session = new Session({
    id: randomUUID(),
    state: 'state',
    shop: String(shopify.utils.sanitizeShop(String(process.env.NEXT_PUBLIC_SHOP), true)),
    isOnline: true,
    accessToken: process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ADMIN_ACCESS_TOKEN
})

export const shopifyInit = async () => {
    return { shopify, session };
}
