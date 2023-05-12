import { shopifyInit } from "./shopifyInit";

export const storeFrontInit = async () => {
    return null;

    // const { shopify, session } = await shopifyInit()

    // const adminApiClient = new shopify.clients.Rest({ session });
    // const storefrontTokenResponse = await adminApiClient.post({
    //     path: 'storefront_access_tokens',
    //     type: DataType.JSON,
    //     data: {
    //         storefront_access_token: {
    //             title: 'This is my test access token',
    //         },
    //     },
    // });
    // const storefrontAccessToken = storefrontTokenResponse.body['storefront_access_token']['access_token'];

    // return storefrontAccessToken;
}